# Dictum SDK utility: make_context

from core.context import DictumContext


def make_context_util(ctxmap, basectx):
    return DictumContext(ctxmap, basectx)
