<?php
declare(strict_types=1);

// Dictum SDK utility: result_body

class DictumResultBody
{
    public static function call(DictumContext $ctx): ?DictumResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
