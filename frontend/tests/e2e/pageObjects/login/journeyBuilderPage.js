import { Selector, t } from 'testcafe'
import { ClientFunction } from 'testcafe';
const log = require('npmlog')

class journeyBuilderPage {

    constructor() {

        this.registerButton = Selector('a').withText('Register')
        this.loginButton = Selector('a').withText('Log In')
    }

    async clikcRegisterButton() {
        await t.click(this.registerButton)
        log.info("register button clicked")
    }

    async clickLoginButton() {
        await t.click(this.loginButton)
        log.info("login button clicked")
    }

    async verifyUrl(url){
        const getURL = await ClientFunction(() => window.location.href)();
        await t.expect(getURL).contains(url)
        log.info("url verified")
    }


}
export default journeyBuilderPage