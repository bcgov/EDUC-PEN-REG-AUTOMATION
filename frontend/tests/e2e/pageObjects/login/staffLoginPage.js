import { Selector, t } from 'testcafe'
const log = require('npmlog')

class staffLoginPage {

    constructor() {

        this.login = Selector('#login-button')
        this.username = Selector('#user')
        this.password = Selector('#password')
        this.submitButton = Selector('input[name=\'btnSubmit\']')


    }


    async stafflogin(credentials) {

        await t.click(this.login)
            .typeText(this.username, credentials.username, { timeout: 20000 })
            .typeText(this.password, credentials.password, { timeout: 20000 })
            .click(this.submitButton);
            log.info("Staff user successfully logged in with IDIR    "+ credentials.username )

    }
}

export default staffLoginPage