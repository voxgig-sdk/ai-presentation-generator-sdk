<?php
declare(strict_types=1);

// AiPresentationGenerator SDK utility: feature_add

class AiPresentationGeneratorFeatureAdd
{
    public static function call(AiPresentationGeneratorContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
