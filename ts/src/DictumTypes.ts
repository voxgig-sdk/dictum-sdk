// Typed models for the Dictum SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Author {
  bio?: string
  name: string
  quoteCount: number
}

export interface AuthorListMatch {
  limit?: number
  page?: number
}

export interface Category {
  categories?: any[]
  total?: number
}

export interface CategoryListMatch {
  categories?: any[]
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

  // Selects a custom action instead of the plain load:
  //   'random'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface QuoteListMatch {
  author?: string
  category?: string
  limit?: number
  page?: number
}

