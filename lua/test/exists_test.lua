-- AiPresentationGenerator SDK exists test

local sdk = require("ai-presentation-generator_sdk")

describe("AiPresentationGeneratorSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
