-- AiPresentationGenerator SDK error

local AiPresentationGeneratorError = {}
AiPresentationGeneratorError.__index = AiPresentationGeneratorError


function AiPresentationGeneratorError.new(code, msg, ctx)
  local self = setmetatable({}, AiPresentationGeneratorError)
  self.is_sdk_error = true
  self.sdk = "AiPresentationGenerator"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AiPresentationGeneratorError:error()
  return self.msg
end


function AiPresentationGeneratorError:__tostring()
  return self.msg
end


return AiPresentationGeneratorError
