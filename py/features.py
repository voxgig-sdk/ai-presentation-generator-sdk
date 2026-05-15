# AiPresentationGenerator SDK feature factory

from feature.base_feature import AiPresentationGeneratorBaseFeature
from feature.test_feature import AiPresentationGeneratorTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AiPresentationGeneratorBaseFeature(),
        "test": lambda: AiPresentationGeneratorTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
