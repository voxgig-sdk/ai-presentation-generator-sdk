# AiPresentationGenerator SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AiPresentationGeneratorUtility.registrar = ->(u) {
  u.clean = AiPresentationGeneratorUtilities::Clean
  u.done = AiPresentationGeneratorUtilities::Done
  u.make_error = AiPresentationGeneratorUtilities::MakeError
  u.feature_add = AiPresentationGeneratorUtilities::FeatureAdd
  u.feature_hook = AiPresentationGeneratorUtilities::FeatureHook
  u.feature_init = AiPresentationGeneratorUtilities::FeatureInit
  u.fetcher = AiPresentationGeneratorUtilities::Fetcher
  u.make_fetch_def = AiPresentationGeneratorUtilities::MakeFetchDef
  u.make_context = AiPresentationGeneratorUtilities::MakeContext
  u.make_options = AiPresentationGeneratorUtilities::MakeOptions
  u.make_request = AiPresentationGeneratorUtilities::MakeRequest
  u.make_response = AiPresentationGeneratorUtilities::MakeResponse
  u.make_result = AiPresentationGeneratorUtilities::MakeResult
  u.make_point = AiPresentationGeneratorUtilities::MakePoint
  u.make_spec = AiPresentationGeneratorUtilities::MakeSpec
  u.make_url = AiPresentationGeneratorUtilities::MakeUrl
  u.param = AiPresentationGeneratorUtilities::Param
  u.prepare_auth = AiPresentationGeneratorUtilities::PrepareAuth
  u.prepare_body = AiPresentationGeneratorUtilities::PrepareBody
  u.prepare_headers = AiPresentationGeneratorUtilities::PrepareHeaders
  u.prepare_method = AiPresentationGeneratorUtilities::PrepareMethod
  u.prepare_params = AiPresentationGeneratorUtilities::PrepareParams
  u.prepare_path = AiPresentationGeneratorUtilities::PreparePath
  u.prepare_query = AiPresentationGeneratorUtilities::PrepareQuery
  u.result_basic = AiPresentationGeneratorUtilities::ResultBasic
  u.result_body = AiPresentationGeneratorUtilities::ResultBody
  u.result_headers = AiPresentationGeneratorUtilities::ResultHeaders
  u.transform_request = AiPresentationGeneratorUtilities::TransformRequest
  u.transform_response = AiPresentationGeneratorUtilities::TransformResponse
}
