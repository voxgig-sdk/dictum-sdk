# Typed models for the Dictum SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AuthorRequired(TypedDict):
    name: str
    quote_count: int


class Author(AuthorRequired, total=False):
    bio: str


class AuthorListMatch(TypedDict, total=False):
    bio: str
    name: str
    quote_count: int


class Category(TypedDict, total=False):
    category: list
    total: int


class CategoryListMatch(TypedDict, total=False):
    category: list
    total: int


class QuoteRequired(TypedDict):
    author: str
    id: str
    text: str


class Quote(QuoteRequired, total=False):
    category: str
    source: str


class QuoteLoadMatch(TypedDict):
    id: str


class QuoteListMatch(TypedDict, total=False):
    author: str
    category: str
    id: str
    source: str
    text: str
