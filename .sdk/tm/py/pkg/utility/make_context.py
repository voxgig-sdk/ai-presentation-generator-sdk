# AiPresentationGenerator SDK utility: make_context

from projectname_sdk.core.context import AiPresentationGeneratorContext


def make_context_util(ctxmap, basectx):
    return AiPresentationGeneratorContext(ctxmap, basectx)
