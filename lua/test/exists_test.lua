-- Dictum SDK exists test

local sdk = require("dictum_sdk")

describe("DictumSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
