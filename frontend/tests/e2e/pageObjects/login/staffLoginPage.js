import { Selector, t } from 'testcafe'
import { ClientFunction } from 'testcafe';
const log = require('npmlog')
const nodeDate = require('date-and-time')

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

        //session timeout related
        this.sessionExpiredText = Selector('#session-expired-text')
        this.sessionExpiredDescription = Selector('#session-expired-descriptor')
        this.loginButton = Selector('#login-button')

    }

    async stafflogin(credentials, url) {

        for (let i = 0; i < 10; i++) {
            try {
                await t.click(this.login)
                    .typeText(this.username, credentials.username, { timeout: 20000 })
                    .typeText(this.password, credentials.password, { timeout: 20000 })
                    .click(this.submitButton)
                await t.expect((this.viewGmpButton).exists).ok({ timeout: 20000 })
                log.info("Staff user successfully logged in with IDIR    " + credentials.username)
                break
            }
            catch (err) {
                await t.eval(() => location.reload())
                log.warn("Element not found, Refreshing the page")

                await t.navigateTo(url)
                log.info("Navigating to student admin")

                await t.expect((this.login).exists).ok({ timeout: 20000 })
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

    async time() {
        let date = new Date()
        return nodeDate.format(date, 'YYYY-MM-DD hh-mm-ss')
    }

    async waitForThirtyTwoMinutes() {
        log.info("Implicit  wait started at " + await this.time())
        await t.wait(1920000)
        log.info("Implicit wait completed at " + await this.time())
    }

    async verifySessionExpired() {
        await t.expect(this.sessionExpiredText.innerText).eql("Session Expired")
        await t.expect(this.sessionExpiredDescription.innerText).eql("Your secure session has ended as a result of inactivity.")
        await t.expect(this.loginButton.exists).ok()
        log.info("Session expired messages verified")
    }
}

export default staffLoginPage