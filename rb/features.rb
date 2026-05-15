# Dictum SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module DictumFeatures
  def self.make_feature(name)
    case name
    when "base"
      DictumBaseFeature.new
    when "test"
      DictumTestFeature.new
    else
      DictumBaseFeature.new
    end
  end
end
