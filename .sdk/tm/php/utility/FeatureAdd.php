<?php
declare(strict_types=1);

// Dictum SDK utility: feature_add

class DictumFeatureAdd
{
    public static function call(DictumContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
