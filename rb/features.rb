# Dictum SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module DictumFeatures
  def self.make_feature(name)
    case name
    when "base"
      DictumBaseFeature.new
    when "ratelimit"
      DictumRatelimitFeature.new
    when "retry"
      DictumRetryFeature.new
    when "test"
      DictumTestFeature.new
    when "timeout"
      DictumTimeoutFeature.new
    else
      DictumBaseFeature.new
    end
  end
end
