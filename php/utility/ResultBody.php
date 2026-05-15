<?php
declare(strict_types=1);

// AiPresentationGenerator SDK utility: result_body

class AiPresentationGeneratorResultBody
{
    public static function call(AiPresentationGeneratorContext $ctx): ?AiPresentationGeneratorResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
