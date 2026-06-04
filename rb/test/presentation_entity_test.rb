# Presentation entity test

require "minitest/autorun"
require "json"
require_relative "../AiPresentationGenerator_sdk"
require_relative "runner"

class PresentationEntityTest < Minitest::Test
  def test_create_instance
    testsdk = AiPresentationGeneratorSDK.test(nil, nil)
    ent = testsdk.Presentation(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = presentation_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "presentation." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set AIPRESENTATIONGENERATOR_TEST_PRESENTATION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    presentation_ref01_ent = client.Presentation(nil)
    presentation_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.presentation"), "presentation_ref01"))

    presentation_ref01_data_result, err = presentation_ref01_ent.create(presentation_ref01_data, nil)
    assert_nil err
    presentation_ref01_data = Helpers.to_map(presentation_ref01_data_result)
    assert !presentation_ref01_data.nil?
    assert !presentation_ref01_data["id"].nil?

    # LOAD
    presentation_ref01_match_dt0 = {
      "id" => presentation_ref01_data["id"],
    }
    presentation_ref01_data_dt0_loaded, err = presentation_ref01_ent.load(presentation_ref01_match_dt0, nil)
    assert_nil err
    presentation_ref01_data_dt0_load_result = Helpers.to_map(presentation_ref01_data_dt0_loaded)
    assert !presentation_ref01_data_dt0_load_result.nil?
    assert_equal presentation_ref01_data_dt0_load_result["id"], presentation_ref01_data["id"]

  end
end

def presentation_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "presentation", "PresentationTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = AiPresentationGeneratorSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["presentation01", "presentation02", "presentation03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["AIPRESENTATIONGENERATOR_TEST_PRESENTATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "AIPRESENTATIONGENERATOR_TEST_PRESENTATION_ENTID" => idmap,
    "AIPRESENTATIONGENERATOR_TEST_LIVE" => "FALSE",
    "AIPRESENTATIONGENERATOR_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["AIPRESENTATIONGENERATOR_TEST_PRESENTATION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["AIPRESENTATIONGENERATOR_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = AiPresentationGeneratorSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["AIPRESENTATIONGENERATOR_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["AIPRESENTATIONGENERATOR_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
