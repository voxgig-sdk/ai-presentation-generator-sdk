package core

type AiPresentationGeneratorError struct {
	IsAiPresentationGeneratorError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewAiPresentationGeneratorError(code string, msg string, ctx *Context) *AiPresentationGeneratorError {
	return &AiPresentationGeneratorError{
		IsAiPresentationGeneratorError: true,
		Sdk:              "AiPresentationGenerator",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *AiPresentationGeneratorError) Error() string {
	return e.Msg
}
