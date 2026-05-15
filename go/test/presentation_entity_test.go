package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/ai-presentation-generator-sdk"
	"github.com/voxgig-sdk/ai-presentation-generator-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestPresentationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Presentation(nil)
		if ent == nil {
			t.Fatal("expected non-nil PresentationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := presentationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "presentation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set AIPRESENTATIONGENERATOR_TEST_PRESENTATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		presentationRef01Ent := client.Presentation(nil)
		presentationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "presentation"}, setup.data), "presentation_ref01"))

		presentationRef01DataResult, err := presentationRef01Ent.Create(presentationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		presentationRef01Data = core.ToMapAny(presentationRef01DataResult)
		if presentationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if presentationRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LOAD
		presentationRef01MatchDt0 := map[string]any{
			"id": presentationRef01Data["id"],
		}
		presentationRef01DataDt0Loaded, err := presentationRef01Ent.Load(presentationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		presentationRef01DataDt0LoadResult := core.ToMapAny(presentationRef01DataDt0Loaded)
		if presentationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if presentationRef01DataDt0LoadResult["id"] != presentationRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func presentationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "presentation", "PresentationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read presentation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse presentation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"presentation01", "presentation02", "presentation03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("AIPRESENTATIONGENERATOR_TEST_PRESENTATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"AIPRESENTATIONGENERATOR_TEST_PRESENTATION_ENTID": idmap,
		"AIPRESENTATIONGENERATOR_TEST_LIVE":      "FALSE",
		"AIPRESENTATIONGENERATOR_TEST_EXPLAIN":   "FALSE",
		"AIPRESENTATIONGENERATOR_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["AIPRESENTATIONGENERATOR_TEST_PRESENTATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["AIPRESENTATIONGENERATOR_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["AIPRESENTATIONGENERATOR_APIKEY"],
			},
			extra,
		})
		client = sdk.NewAiPresentationGeneratorSDK(core.ToMapAny(mergedOpts))
	}

	live := env["AIPRESENTATIONGENERATOR_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["AIPRESENTATIONGENERATOR_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
