<?php
declare(strict_types=1);

// Typed models for the Dictum SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Author entity data model. */
class Author
{
    public ?string $bio = null;
    public string $name;
    public int $quote_count;
}

/** Request payload for Author#list. */
class AuthorListMatch
{
    public ?string $bio = null;
    public ?string $name = null;
    public ?int $quote_count = null;
}

/** Category entity data model. */
class Category
{
    public ?array $category = null;
    public ?int $total = null;
}

/** Request payload for Category#list. */
class CategoryListMatch
{
    public ?array $category = null;
    public ?int $total = null;
}

/** Quote entity data model. */
class Quote
{
    public string $author;
    public ?string $category = null;
    public string $id;
    public ?string $source = null;
    public string $text;
}

/** Request payload for Quote#load. */
class QuoteLoadMatch
{
    public string $id;
}

/** Request payload for Quote#list. */
class QuoteListMatch
{
    public ?string $author = null;
    public ?string $category = null;
    public ?string $id = null;
    public ?string $source = null;
    public ?string $text = null;
}

