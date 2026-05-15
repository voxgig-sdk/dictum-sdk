# Dictum SDK utility: make_context
require_relative '../core/context'
module DictumUtilities
  MakeContext = ->(ctxmap, basectx) {
    DictumContext.new(ctxmap, basectx)
  }
end
