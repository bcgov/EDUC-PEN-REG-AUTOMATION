import { Selector, t } from 'testcafe'
const log = require('npmlog')
const assert = require('assert')

class mailsacPage {

    constructor() {

        this.username = Selector('input[placeholder=username]')
        this.password = Selector('input[placeholder=password]')
        this.submitButton = Selector('button.btn.btn-primary')
        this.myInboxTextBox = Selector('input[placeholder=anything]')
        this.checkTheEmailButton = Selector('button.btn.btn-primary.btn-block')
        this.expectGmpActivateEmail = Selector('tr').withText('Activate your GetMyPEN request within 24 hours of receiving this email')
        this.expectUmpActivateEmail = Selector('tr').withText('Activate your UpdateMyPENInfo request within 24 hours of receiving this email')
        this.gmpActivateLink = Selector('a').withText('/api/gmp/verification').filterVisible()
        this.umpActivateLink = Selector('a').withText('/api/ump/verification').filterVisible()
        this.deleteMailButton = Selector('button').withText('Delete').filterVisible()
        this.permanentlyDeleteButton = Selector('button').withText('Permanently delete').filterVisible()
        this.emailVerifiedConformationtext = Selector('p:nth-of-type(1) > strong:nth-of-type(1)')
    }


    async setUsername(data) {
        await t.typeText(this.username, data)
        log.info("entered mailsac username")
    }

    async setPassword(data) {
        await t.typeText(this.password, data)
        log.info("entered mailsac password")
    }

    async clickSubmitButton() {
        await t.click(this.submitButton)
        log.info("Clicked mailsac submit button")
    }

    async setMyInboxTextBox(email , environment) {
        await t.typeText(this.myInboxTextBox, email+environment+"@mailsac.com")
        log.info("entered inbox email address")
    }

    async clickCheckTheEmailButton() {
        await t.click(this.checkTheEmailButton)
        log.info("clicked check email button")
    }

    async mailsacLogin(credentials) {
        await t.typeText(this.username, credentials.username)
        await t.typeText(this.password, credentials.password)
        await t.click(this.submitButton)
        log.info("Mailsac Login successful")
    }


    async activatePenRequest(activationBool) {
        for (let i = 0; i < 10; i++) {

            if (await this.expectGmpActivateEmail.exists && await this.expectGmpActivateEmail.visible) {
                await t.click(this.expectGmpActivateEmail)
                log.info("Element found, breaking the loop")
                break;
            }
            else {
                await t.wait(10000)
                await t.eval(() => location.reload(true))
                log.warn("Element not found, Refreshing the page")
            }
        }

        const link = this.gmpActivateLink.innerText
        log.info(await link)
        await t.click(this.deleteMailButton)
        await t.wait(3000)
        log.info("Delete Mail button is clicked")
        await t.click(this.permanentlyDeleteButton)
        log.info("Permanently Delete Mail button is clicked")
        
        if (activationBool  === true) {
            log.info('Navigating to new page for email verification')
            await t.navigateTo(await link)
            await t.wait(5000)
        }
    }

    async activateUmpRequest(activationBool) {
        for (let i = 0; i < 10; i++) {

            if (await this.expectUmpActivateEmail.exists && await this.expectUmpActivateEmail.visible) {
                await t.click(this.expectUmpActivateEmail)
                log.info("Element found, breaking the loop")
                break;
            }
            else {
                await t.wait(10000)
                await t.eval(() => location.reload(true))
                log.warn("Element not found, Refreshing the page")
            }
        }

        const link = this.umpActivateLink.innerText
        log.info(await link)
        await t.click(this.deleteMailButton)
        await t.wait(3000)
        log.info("Delete Mail button is clicked")
        await t.click(this.permanentlyDeleteButton)
        log.info("Permanently Delete Mail button is clicked")
        
        if (activationBool  === true) {
            log.info('Navigating to new page for email verification')
            await t.navigateTo(await link)
            await t.wait(5000)
        }
    }
    async confirmEmailVerified(data) {
        log.info('Email conformation text displayed as    ' + await this.emailVerifiedConformationtext.innerText)
        assert.equal(data, await this.emailVerifiedConformationtext.innerText)

    }


}

export default mailsacPage