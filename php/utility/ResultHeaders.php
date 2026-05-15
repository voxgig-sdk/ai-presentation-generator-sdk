<?php
declare(strict_types=1);

// AiPresentationGenerator SDK utility: result_headers

class AiPresentationGeneratorResultHeaders
{
    public static function call(AiPresentationGeneratorContext $ctx): ?AiPresentationGeneratorResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
