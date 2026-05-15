# AiPresentationGenerator SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module AiPresentationGeneratorFeatures
  def self.make_feature(name)
    case name
    when "base"
      AiPresentationGeneratorBaseFeature.new
    when "test"
      AiPresentationGeneratorTestFeature.new
    else
      AiPresentationGeneratorBaseFeature.new
    end
  end
end
