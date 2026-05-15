# Dictum SDK utility: feature_add
module DictumUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
