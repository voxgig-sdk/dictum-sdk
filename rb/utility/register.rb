# Dictum SDK utility registration
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

DictumUtility.registrar = ->(u) {
  u.clean = DictumUtilities::Clean
  u.done = DictumUtilities::Done
  u.make_error = DictumUtilities::MakeError
  u.feature_add = DictumUtilities::FeatureAdd
  u.feature_hook = DictumUtilities::FeatureHook
  u.feature_init = DictumUtilities::FeatureInit
  u.fetcher = DictumUtilities::Fetcher
  u.make_fetch_def = DictumUtilities::MakeFetchDef
  u.make_context = DictumUtilities::MakeContext
  u.make_options = DictumUtilities::MakeOptions
  u.make_request = DictumUtilities::MakeRequest
  u.make_response = DictumUtilities::MakeResponse
  u.make_result = DictumUtilities::MakeResult
  u.make_point = DictumUtilities::MakePoint
  u.make_spec = DictumUtilities::MakeSpec
  u.make_url = DictumUtilities::MakeUrl
  u.param = DictumUtilities::Param
  u.prepare_auth = DictumUtilities::PrepareAuth
  u.prepare_body = DictumUtilities::PrepareBody
  u.prepare_headers = DictumUtilities::PrepareHeaders
  u.prepare_method = DictumUtilities::PrepareMethod
  u.prepare_params = DictumUtilities::PrepareParams
  u.prepare_path = DictumUtilities::PreparePath
  u.prepare_query = DictumUtilities::PrepareQuery
  u.result_basic = DictumUtilities::ResultBasic
  u.result_body = DictumUtilities::ResultBody
  u.result_headers = DictumUtilities::ResultHeaders
  u.transform_request = DictumUtilities::TransformRequest
  u.transform_response = DictumUtilities::TransformResponse
}
