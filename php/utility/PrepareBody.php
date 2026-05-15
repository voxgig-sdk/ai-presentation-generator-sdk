<?php
declare(strict_types=1);

// AiPresentationGenerator SDK utility: prepare_body

class AiPresentationGeneratorPrepareBody
{
    public static function call(AiPresentationGeneratorContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
