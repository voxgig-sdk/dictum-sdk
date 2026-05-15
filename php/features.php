<?php
declare(strict_types=1);

// Dictum SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class DictumFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new DictumBaseFeature();
            case "test":
                return new DictumTestFeature();
            default:
                return new DictumBaseFeature();
        }
    }
}
