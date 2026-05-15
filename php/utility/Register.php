<?php
declare(strict_types=1);

// Dictum SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

DictumUtility::setRegistrar(function (DictumUtility $u): void {
    $u->clean = [DictumClean::class, 'call'];
    $u->done = [DictumDone::class, 'call'];
    $u->make_error = [DictumMakeError::class, 'call'];
    $u->feature_add = [DictumFeatureAdd::class, 'call'];
    $u->feature_hook = [DictumFeatureHook::class, 'call'];
    $u->feature_init = [DictumFeatureInit::class, 'call'];
    $u->fetcher = [DictumFetcher::class, 'call'];
    $u->make_fetch_def = [DictumMakeFetchDef::class, 'call'];
    $u->make_context = [DictumMakeContext::class, 'call'];
    $u->make_options = [DictumMakeOptions::class, 'call'];
    $u->make_request = [DictumMakeRequest::class, 'call'];
    $u->make_response = [DictumMakeResponse::class, 'call'];
    $u->make_result = [DictumMakeResult::class, 'call'];
    $u->make_point = [DictumMakePoint::class, 'call'];
    $u->make_spec = [DictumMakeSpec::class, 'call'];
    $u->make_url = [DictumMakeUrl::class, 'call'];
    $u->param = [DictumParam::class, 'call'];
    $u->prepare_auth = [DictumPrepareAuth::class, 'call'];
    $u->prepare_body = [DictumPrepareBody::class, 'call'];
    $u->prepare_headers = [DictumPrepareHeaders::class, 'call'];
    $u->prepare_method = [DictumPrepareMethod::class, 'call'];
    $u->prepare_params = [DictumPrepareParams::class, 'call'];
    $u->prepare_path = [DictumPreparePath::class, 'call'];
    $u->prepare_query = [DictumPrepareQuery::class, 'call'];
    $u->result_basic = [DictumResultBasic::class, 'call'];
    $u->result_body = [DictumResultBody::class, 'call'];
    $u->result_headers = [DictumResultHeaders::class, 'call'];
    $u->transform_request = [DictumTransformRequest::class, 'call'];
    $u->transform_response = [DictumTransformResponse::class, 'call'];
});
