package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/ai-presentation-generator-sdk/go"
	"github.com/voxgig-sdk/ai-presentation-generator-sdk/go/core"

	vs "github.com/voxgig-sdk/ai-presentation-generator-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const presentationEntityLiveStrict = true


func TestPresentationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Presentation(nil)
		if ent == nil {
			t.Fatal("expected non-nil PresentationEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Presentation(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.AiPresentationGeneratorError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
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
		client := setup.client
		_ = client

		// CREATE
		presentationRef01Ent := client.Presentation(nil)
		presentationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "presentation"}), "presentation_ref01"))

		presentationRef01DataResult, err := presentationRef01Ent.Create(presentationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		presentationRef01Data = core.ToMapAny(entityData(presentationRef01DataResult))
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
		presentationRef01DataDt0LoadResult := core.ToMapAny(entityData(presentationRef01DataDt0Loaded))
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
	idmap, _ := vs.Transform(
		[]any{"presentation01", "presentation02", "presentation03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID": idmap,
		"AI_PRESENTATION_GENERATOR_TEST_LIVE":      "FALSE",
		"AI_PRESENTATION_GENERATOR_TEST_EXPLAIN":   "FALSE",
		"AI_PRESENTATION_GENERATOR_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["AI_PRESENTATION_GENERATOR_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["AI_PRESENTATION_GENERATOR_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewAiPresentationGeneratorSDK(core.ToMapAny(mergedOpts))
	}

	live := env["AI_PRESENTATION_GENERATOR_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["AI_PRESENTATION_GENERATOR_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
