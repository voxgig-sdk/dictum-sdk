// Typed models for the Dictum SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Author {
  bio?: string
  name: string
  quote_count: number
}

export interface AuthorListMatch {
  bio?: string
  name?: string
  quote_count?: number
}

export interface Category {
  category?: any[]
  total?: number
}

export interface CategoryListMatch {
  category?: any[]
  total?: number
}

export interface Quote {
  author: string
  category?: string
  id: string
  source?: string
  text: string
}

export interface QuoteLoadMatch {
  id: string
}

export interface QuoteListMatch {
  author?: string
  category?: string
  id?: string
  source?: string
  text?: string
}

