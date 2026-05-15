package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAuthorEntityFunc func(client *DictumSDK, entopts map[string]any) DictumEntity

var NewCategoryEntityFunc func(client *DictumSDK, entopts map[string]any) DictumEntity

var NewQuoteEntityFunc func(client *DictumSDK, entopts map[string]any) DictumEntity

