# AiPresentationGenerator SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AiPresentationGeneratorFeatures
  def self.make_feature(name)
    case name
    when "base"
      AiPresentationGeneratorBaseFeature.new
    when "ratelimit"
      AiPresentationGeneratorRatelimitFeature.new
    when "retry"
      AiPresentationGeneratorRetryFeature.new
    when "test"
      AiPresentationGeneratorTestFeature.new
    when "timeout"
      AiPresentationGeneratorTimeoutFeature.new
    else
      AiPresentationGeneratorBaseFeature.new
    end
  end
end
