<?php
declare(strict_types=1);

// AiPresentationGenerator SDK utility registration

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

AiPresentationGeneratorUtility::setRegistrar(function (AiPresentationGeneratorUtility $u): void {
    $u->clean = [AiPresentationGeneratorClean::class, 'call'];
    $u->done = [AiPresentationGeneratorDone::class, 'call'];
    $u->make_error = [AiPresentationGeneratorMakeError::class, 'call'];
    $u->feature_add = [AiPresentationGeneratorFeatureAdd::class, 'call'];
    $u->feature_hook = [AiPresentationGeneratorFeatureHook::class, 'call'];
    $u->feature_init = [AiPresentationGeneratorFeatureInit::class, 'call'];
    $u->fetcher = [AiPresentationGeneratorFetcher::class, 'call'];
    $u->make_fetch_def = [AiPresentationGeneratorMakeFetchDef::class, 'call'];
    $u->make_context = [AiPresentationGeneratorMakeContext::class, 'call'];
    $u->make_options = [AiPresentationGeneratorMakeOptions::class, 'call'];
    $u->make_request = [AiPresentationGeneratorMakeRequest::class, 'call'];
    $u->make_response = [AiPresentationGeneratorMakeResponse::class, 'call'];
    $u->make_result = [AiPresentationGeneratorMakeResult::class, 'call'];
    $u->make_point = [AiPresentationGeneratorMakePoint::class, 'call'];
    $u->make_spec = [AiPresentationGeneratorMakeSpec::class, 'call'];
    $u->make_url = [AiPresentationGeneratorMakeUrl::class, 'call'];
    $u->param = [AiPresentationGeneratorParam::class, 'call'];
    $u->prepare_auth = [AiPresentationGeneratorPrepareAuth::class, 'call'];
    $u->prepare_body = [AiPresentationGeneratorPrepareBody::class, 'call'];
    $u->prepare_headers = [AiPresentationGeneratorPrepareHeaders::class, 'call'];
    $u->prepare_method = [AiPresentationGeneratorPrepareMethod::class, 'call'];
    $u->prepare_params = [AiPresentationGeneratorPrepareParams::class, 'call'];
    $u->prepare_path = [AiPresentationGeneratorPreparePath::class, 'call'];
    $u->prepare_query = [AiPresentationGeneratorPrepareQuery::class, 'call'];
    $u->result_basic = [AiPresentationGeneratorResultBasic::class, 'call'];
    $u->result_body = [AiPresentationGeneratorResultBody::class, 'call'];
    $u->result_headers = [AiPresentationGeneratorResultHeaders::class, 'call'];
    $u->transform_request = [AiPresentationGeneratorTransformRequest::class, 'call'];
    $u->transform_response = [AiPresentationGeneratorTransformResponse::class, 'call'];
});
