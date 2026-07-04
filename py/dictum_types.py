# Typed models for the Dictum SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Author:
    name: str
    quote_count: int
    bio: Optional[str] = None


@dataclass
class AuthorListMatch:
    bio: Optional[str] = None
    name: Optional[str] = None
    quote_count: Optional[int] = None


@dataclass
class Category:
    category: Optional[list] = None
    total: Optional[int] = None


@dataclass
class CategoryListMatch:
    category: Optional[list] = None
    total: Optional[int] = None


@dataclass
class Quote:
    author: str
    id: str
    text: str
    category: Optional[str] = None
    source: Optional[str] = None


@dataclass
class QuoteLoadMatch:
    id: str


@dataclass
class QuoteListMatch:
    author: Optional[str] = None
    category: Optional[str] = None
    id: Optional[str] = None
    source: Optional[str] = None
    text: Optional[str] = None

