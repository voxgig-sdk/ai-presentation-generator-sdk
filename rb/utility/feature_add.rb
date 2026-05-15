# AiPresentationGenerator SDK utility: feature_add
module AiPresentationGeneratorUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
