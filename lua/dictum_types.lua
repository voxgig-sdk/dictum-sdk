-- Typed models for the Dictum SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Author
---@field bio? string
---@field name string
---@field quote_count number

---@class AuthorListMatch
---@field bio? string
---@field name? string
---@field quote_count? number

---@class Category
---@field category? table
---@field total? number

---@class CategoryListMatch
---@field category? table
---@field total? number

---@class Quote
---@field author string
---@field category? string
---@field id string
---@field source? string
---@field text string

---@class QuoteLoadMatch
---@field id string

---@class QuoteListMatch
---@field author? string
---@field category? string
---@field id? string
---@field source? string
---@field text? string

local M = {}

return M
