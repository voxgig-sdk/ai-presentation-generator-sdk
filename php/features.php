<?php
declare(strict_types=1);

// AiPresentationGenerator SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class AiPresentationGeneratorFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new AiPresentationGeneratorBaseFeature();
            case "test":
                return new AiPresentationGeneratorTestFeature();
            default:
                return new AiPresentationGeneratorBaseFeature();
        }
    }
}
