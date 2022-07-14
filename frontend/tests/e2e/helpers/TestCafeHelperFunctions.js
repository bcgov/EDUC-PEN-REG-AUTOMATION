import { ClientFunction } from 'testcafe'

const TestCafeHelperFunctions = {
    getCurrentLocation() {
        return ClientFunction(() => document.location.href);
    }
}

module.exports = TestCafeHelperFunctions;