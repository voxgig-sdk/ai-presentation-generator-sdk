package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewPresentationEntityFunc func(client *AiPresentationGeneratorSDK, entopts map[string]any) AiPresentationGeneratorEntity

