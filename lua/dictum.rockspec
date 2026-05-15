package = "voxgig-sdk-dictum"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/dictum-sdk.git"
}
description = {
  summary = "Dictum SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["dictum_sdk"] = "dictum_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
