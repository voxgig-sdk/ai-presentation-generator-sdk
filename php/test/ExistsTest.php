<?php
declare(strict_types=1);

// AiPresentationGenerator SDK exists test

require_once __DIR__ . '/../aipresentationgenerator_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = AiPresentationGeneratorSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
