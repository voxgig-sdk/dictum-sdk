# Dictum SDK exists test

require "minitest/autorun"
require_relative "../Dictum_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = DictumSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
