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

export type AuthorListMatch = Partial<Author>

export interface Category {
  category?: any[]
  total?: number
}

export type CategoryListMatch = Partial<Category>

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

export type QuoteListMatch = Partial<Quote>

