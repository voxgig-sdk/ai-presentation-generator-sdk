package voxgigaipresentationgeneratorsdk

import (
	"github.com/voxgig-sdk/ai-presentation-generator-sdk/go/core"
	"github.com/voxgig-sdk/ai-presentation-generator-sdk/go/entity"
	"github.com/voxgig-sdk/ai-presentation-generator-sdk/go/feature"
	_ "github.com/voxgig-sdk/ai-presentation-generator-sdk/go/utility"
)

// Type aliases preserve external API.
type AiPresentationGeneratorSDK = core.AiPresentationGeneratorSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AiPresentationGeneratorEntity = core.AiPresentationGeneratorEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AiPresentationGeneratorError = core.AiPresentationGeneratorError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewPresentationEntityFunc = func(client *core.AiPresentationGeneratorSDK, entopts map[string]any) core.AiPresentationGeneratorEntity {
		return entity.NewPresentationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAiPresentationGeneratorSDK = core.NewAiPresentationGeneratorSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewAiPresentationGeneratorSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *AiPresentationGeneratorSDK  { return NewAiPresentationGeneratorSDK(nil) }
func Test() *AiPresentationGeneratorSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
