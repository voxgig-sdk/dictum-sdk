<?php
declare(strict_types=1);

// Dictum SDK utility: prepare_body

class DictumPrepareBody
{
    public static function call(DictumContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
