<?php
declare(strict_types=1);

// Presentation entity test

require_once __DIR__ . '/../aipresentationgenerator_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PresentationEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = AiPresentationGeneratorSDK::test(null, null);
        $ent = $testsdk->Presentation(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = presentation_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "presentation." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $presentation_ref01_ent = $client->Presentation(null);
        $presentation_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.presentation"), "presentation_ref01"));

        $presentation_ref01_data_result = $presentation_ref01_ent->create($presentation_ref01_data, null);
        $presentation_ref01_data = Helpers::to_map(is_object($presentation_ref01_data_result) && method_exists($presentation_ref01_data_result, 'data_get') ? $presentation_ref01_data_result->data_get() : $presentation_ref01_data_result);
        $this->assertNotNull($presentation_ref01_data);
        $this->assertNotNull($presentation_ref01_data["id"]);

        // LOAD
        $presentation_ref01_match_dt0 = [
            "id" => $presentation_ref01_data["id"],
        ];
        $presentation_ref01_data_dt0_loaded = $presentation_ref01_ent->load($presentation_ref01_match_dt0, null);
        $presentation_ref01_data_dt0_load_result = Helpers::to_map(is_object($presentation_ref01_data_dt0_loaded) && method_exists($presentation_ref01_data_dt0_loaded, 'data_get') ? $presentation_ref01_data_dt0_loaded->data_get() : $presentation_ref01_data_dt0_loaded);
        $this->assertNotNull($presentation_ref01_data_dt0_load_result);
        $this->assertEquals($presentation_ref01_data_dt0_load_result["id"], $presentation_ref01_data["id"]);

    }
}

function presentation_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/presentation/PresentationTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = AiPresentationGeneratorSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["presentation01", "presentation02", "presentation03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID" => $idmap,
        "AI_PRESENTATION_GENERATOR_TEST_LIVE" => "FALSE",
        "AI_PRESENTATION_GENERATOR_TEST_EXPLAIN" => "FALSE",
        "AI_PRESENTATION_GENERATOR_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["AI_PRESENTATION_GENERATOR_TEST_PRESENTATION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["AI_PRESENTATION_GENERATOR_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["AI_PRESENTATION_GENERATOR_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new AiPresentationGeneratorSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["AI_PRESENTATION_GENERATOR_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["AI_PRESENTATION_GENERATOR_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
