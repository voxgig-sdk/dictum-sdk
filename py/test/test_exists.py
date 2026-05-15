# ProjectName SDK exists test

import pytest
from dictum_sdk import DictumSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DictumSDK.test(None, None)
        assert testsdk is not None
