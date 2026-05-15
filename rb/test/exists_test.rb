# AiPresentationGenerator SDK exists test

require "minitest/autorun"
require_relative "../AiPresentationGenerator_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AiPresentationGeneratorSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
