import { Selector, t } from 'testcafe'
import TestCafeHelperFunctions from "../../helpers/TestCafeHelperFunctions";
const log = require('npmlog')

class UnauthorizedPage {
    constructor() {
        this.errorText = Selector("#error_text");
        this.errorMessage = Selector("#error_message");
    }

    async forceNavigate(url) {
        return t.navigateTo(url);
    }

    async verifyIsOnUnauthorizedPage() {
        const location = TestCafeHelperFunctions.getCurrentLocation()();
        await t.expect(location).contains('unauthorized-page');
        log.info("Verified current page is the unauthorized page.");
    }

    async verifyErrorText() {
        await t.expect(this.errorText.innerText).eql('Unauthorized Page Access');
        log.info("Verified unauthorized error text.");
    }

    async verifyErrorMessage() {
        await t.expect(this.errorMessage.innerText).eql('You do not have the required roles to view this page.');
        log.info("Verified unauthorized error message.");
    }
}

export default UnauthorizedPage;