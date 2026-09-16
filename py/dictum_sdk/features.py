# Dictum SDK feature factory

from dictum_sdk.feature.base_feature import DictumBaseFeature
from dictum_sdk.feature.ratelimit_feature import DictumRatelimitFeature
from dictum_sdk.feature.retry_feature import DictumRetryFeature
from dictum_sdk.feature.test_feature import DictumTestFeature
from dictum_sdk.feature.timeout_feature import DictumTimeoutFeature


_FEATURES = {
    "base": lambda: DictumBaseFeature(),
    "ratelimit": lambda: DictumRatelimitFeature(),
    "retry": lambda: DictumRetryFeature(),
    "test": lambda: DictumTestFeature(),
    "timeout": lambda: DictumTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
