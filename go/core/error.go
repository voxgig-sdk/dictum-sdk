package core

type DictumError struct {
	IsDictumError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewDictumError(code string, msg string, ctx *Context) *DictumError {
	return &DictumError{
		IsDictumError: true,
		Sdk:              "Dictum",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *DictumError) Error() string {
	return e.Msg
}
