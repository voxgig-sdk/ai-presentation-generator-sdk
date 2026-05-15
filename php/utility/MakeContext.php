<?php
declare(strict_types=1);

// AiPresentationGenerator SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AiPresentationGeneratorMakeContext
{
    public static function call(array $ctxmap, ?AiPresentationGeneratorContext $basectx): AiPresentationGeneratorContext
    {
        return new AiPresentationGeneratorContext($ctxmap, $basectx);
    }
}
