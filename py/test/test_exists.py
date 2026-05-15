# ProjectName SDK exists test

import pytest
from aipresentationgenerator_sdk import AiPresentationGeneratorSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AiPresentationGeneratorSDK.test(None, None)
        assert testsdk is not None
