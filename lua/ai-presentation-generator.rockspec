package = "voxgig-sdk-ai-presentation-generator"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/ai-presentation-generator-sdk.git"
}
description = {
  summary = "AiPresentationGenerator SDK for Lua",
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
    ["ai-presentation-generator_sdk"] = "ai-presentation-generator_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
