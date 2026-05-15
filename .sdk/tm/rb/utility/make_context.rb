# AiPresentationGenerator SDK utility: make_context
require_relative '../core/context'
module AiPresentationGeneratorUtilities
  MakeContext = ->(ctxmap, basectx) {
    AiPresentationGeneratorContext.new(ctxmap, basectx)
  }
end
