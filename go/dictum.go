package voxgigdictumsdk

import (
	"github.com/voxgig-sdk/dictum-sdk/go/core"
	"github.com/voxgig-sdk/dictum-sdk/go/entity"
	"github.com/voxgig-sdk/dictum-sdk/go/feature"
	_ "github.com/voxgig-sdk/dictum-sdk/go/utility"
)

// Type aliases preserve external API.
type DictumSDK = core.DictumSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type DictumEntity = core.DictumEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type DictumError = core.DictumError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAuthorEntityFunc = func(client *core.DictumSDK, entopts map[string]any) core.DictumEntity {
		return entity.NewAuthorEntity(client, entopts)
	}
	core.NewCategoryEntityFunc = func(client *core.DictumSDK, entopts map[string]any) core.DictumEntity {
		return entity.NewCategoryEntity(client, entopts)
	}
	core.NewQuoteEntityFunc = func(client *core.DictumSDK, entopts map[string]any) core.DictumEntity {
		return entity.NewQuoteEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewDictumSDK = core.NewDictumSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
