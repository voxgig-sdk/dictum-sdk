# frozen_string_literal: true

# Typed models for the Dictum SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Author entity data model.
#
# @!attribute [rw] bio
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] quote_count
#   @return [Integer]
Author = Struct.new(
  :bio,
  :name,
  :quote_count,
  keyword_init: true
)

# Match filter for Author#list (any subset of Author fields).
#
# @!attribute [rw] bio
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] quote_count
#   @return [Integer, nil]
AuthorListMatch = Struct.new(
  :bio,
  :name,
  :quote_count,
  keyword_init: true
)

# Category entity data model.
#
# @!attribute [rw] category
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
Category = Struct.new(
  :category,
  :total,
  keyword_init: true
)

# Match filter for Category#list (any subset of Category fields).
#
# @!attribute [rw] category
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
CategoryListMatch = Struct.new(
  :category,
  :total,
  keyword_init: true
)

# Quote entity data model.
#
# @!attribute [rw] author
#   @return [String]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String]
Quote = Struct.new(
  :author,
  :category,
  :id,
  :source,
  :text,
  keyword_init: true
)

# Request payload for Quote#load.
#
# @!attribute [rw] id
#   @return [String]
QuoteLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Match filter for Quote#list (any subset of Quote fields).
#
# @!attribute [rw] author
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
QuoteListMatch = Struct.new(
  :author,
  :category,
  :id,
  :source,
  :text,
  keyword_init: true
)

