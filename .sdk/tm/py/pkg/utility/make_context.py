# Dictum SDK utility: make_context

from projectname_sdk.core.context import DictumContext


def make_context_util(ctxmap, basectx):
    return DictumContext(ctxmap, basectx)
