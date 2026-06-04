-- Presentation entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("ai-presentation-generator_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("PresentationEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Presentation(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = presentation_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "presentation." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set AIPRESENTATIONGENERATOR_TEST_PRESENTATION_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local presentation_ref01_ent = client:Presentation(nil)
    local presentation_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.presentation"), "presentation_ref01"))

    local presentation_ref01_data_result, err = presentation_ref01_ent:create(presentation_ref01_data, nil)
    assert.is_nil(err)
    presentation_ref01_data = helpers.to_map(presentation_ref01_data_result)
    assert.is_not_nil(presentation_ref01_data)
    assert.is_not_nil(presentation_ref01_data["id"])

    -- LOAD
    local presentation_ref01_match_dt0 = {
      id = presentation_ref01_data["id"],
    }
    local presentation_ref01_data_dt0_loaded, err = presentation_ref01_ent:load(presentation_ref01_match_dt0, nil)
    assert.is_nil(err)
    local presentation_ref01_data_dt0_load_result = helpers.to_map(presentation_ref01_data_dt0_loaded)
    assert.is_not_nil(presentation_ref01_data_dt0_load_result)
    assert.are.equal(presentation_ref01_data_dt0_load_result["id"], presentation_ref01_data["id"])

  end)
end)

function presentation_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/presentation/PresentationTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read presentation test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "presentation01", "presentation02", "presentation03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("AIPRESENTATIONGENERATOR_TEST_PRESENTATION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["AIPRESENTATIONGENERATOR_TEST_PRESENTATION_ENTID"] = idmap,
    ["AIPRESENTATIONGENERATOR_TEST_LIVE"] = "FALSE",
    ["AIPRESENTATIONGENERATOR_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["AIPRESENTATIONGENERATOR_TEST_PRESENTATION_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["AIPRESENTATIONGENERATOR_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["AIPRESENTATIONGENERATOR_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["AIPRESENTATIONGENERATOR_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
