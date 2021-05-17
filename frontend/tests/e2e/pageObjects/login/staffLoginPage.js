import { Selector, t } from 'testcafe'
import { ClientFunction } from 'testcafe';
const log = require('npmlog')

class staffLoginPage {

    constructor() {

        this.login = Selector('#login-button')
        this.username = Selector('#user')
        this.password = Selector('#password')
        this.submitButton = Selector('input[name=\'btnSubmit\']')

        //Dashboard related
        this.viewGmpButton = Selector('#GetMyPENBtn')

        //Jb page related
        this.registerButton = Selector('a').withText('Register')


    }

    async stafflogin(credentials, url) {

        for (let i = 0; i < 10; i++) {
            try {
                await t.click(this.login)
                    .typeText(this.username, credentials.username, { timeout: 20000 })
                    .typeText(this.password, credentials.password, { timeout: 20000 })
                    .click(this.submitButton)
                await t.expect((this.viewGmpButton).exists).ok()
                log.info("Staff user successfully logged in with IDIR    " + credentials.username)
                break
            }
            catch (err) {
                await t.eval(() => location.reload())
                log.warn("Element not found, Refreshing the page")

                await t.navigateTo(url)
                log.info("Navigating to student admin")
                // const getURL = await ClientFunction(() => window.location.href)();
                // console.log(getURL)
            }
        }
    }

    async jbPageIdirLogin(credentials) {
        await t
            .typeText(this.username, credentials.username, { timeout: 20000 })
            .typeText(this.password, credentials.password, { timeout: 20000 })
            .click(this.submitButton)

        await t.expect((this.registerButton).exists).ok()
        log.info("JB page Idir login successful")
    }

}

export default staffLoginPage