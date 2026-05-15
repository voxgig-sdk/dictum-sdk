-- Dictum SDK error

local DictumError = {}
DictumError.__index = DictumError


function DictumError.new(code, msg, ctx)
  local self = setmetatable({}, DictumError)
  self.is_sdk_error = true
  self.sdk = "Dictum"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function DictumError:error()
  return self.msg
end


function DictumError:__tostring()
  return self.msg
end


return DictumError
