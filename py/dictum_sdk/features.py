# Dictum SDK feature factory

from dictum_sdk.feature.base_feature import DictumBaseFeature
from dictum_sdk.feature.test_feature import DictumTestFeature


def _make_feature(name):
    features = {
        "base": lambda: DictumBaseFeature(),
        "test": lambda: DictumTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
