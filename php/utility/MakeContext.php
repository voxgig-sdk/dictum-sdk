<?php
declare(strict_types=1);

// Dictum SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class DictumMakeContext
{
    public static function call(array $ctxmap, ?DictumContext $basectx): DictumContext
    {
        return new DictumContext($ctxmap, $basectx);
    }
}
