<?php
declare(strict_types=1);

// Dictum SDK exists test

require_once __DIR__ . '/../dictum_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = DictumSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
