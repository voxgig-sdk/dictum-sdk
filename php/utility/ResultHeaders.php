<?php
declare(strict_types=1);

// Dictum SDK utility: result_headers

class DictumResultHeaders
{
    public static function call(DictumContext $ctx): ?DictumResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
