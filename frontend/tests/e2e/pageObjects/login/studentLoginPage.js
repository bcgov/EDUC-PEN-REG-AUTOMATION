import { Selector, t } from 'testcafe'
const log = require('npmlog')

class studentLoginPage {


    constructor() {

        // login related
        this.username = Selector('#user')
        this.password = Selector('#password')
        this.submitButton = Selector('input[name=\'btnSubmit\']')

        // Bceid account activity related
        this.lastLoginWithBceid = Selector('b').withText('Last Logins with Your BCeID')
        this.doNotShowActivityCheckBox = Selector('#showCLP')
        this.continueButton = Selector('input.btn.btn-primary')

        //BCSC login related
        this.virtualCardButton = Selector('#tile_btn_virtual_device_div_id')
        this.cardSerialNumberInput = Selector('#csn')
        this.bcscContinueButton = Selector('#continue')
        this.passcodeInput = Selector('#passcode')
        this.bcscContinueButton2 = Selector('#btnSubmit')


        // Create new pen request after rejection related
        this.createNewPenRequestButton = Selector('span').withText('Create a new PEN Request')

        // Maintenance Page related
        this.maintenancePageText = Selector('div').withText('Sorry for the inconvenience')
        this.getMyPentextHeader = Selector('span').withText('GetMyPEN')

        //Gmp/Ump related
        this.goToGmp = Selector('#gmpLink')
        this.goToUmp = Selector('#umpLink')

        //User navigation related
        this.displayName = Selector(".display-name")
        this.homeButton = Selector('#home_button')
        this.cancelButton = Selector('#cancelButton')
    }

    async bceidLogin(credentials) {

        try {
        await t
            .typeText(this.username, credentials.username, { timeout: 20000 })
            .typeText(this.password, credentials.password, { timeout: 20000 })
            .click(this.submitButton)
            await t.expect((this.goToGmp).exists).ok()
        log.info("Student user successfully logged in with bceid    " + credentials.username)
        }
        catch(err){
            await t.eval(() => location.reload())
            log.warn("Element not found, Refreshing the page")
            await t
            .typeText(this.username, credentials.username, { timeout: 20000 })
            .typeText(this.password, credentials.password, { timeout: 20000 })
            .click(this.submitButton)
            await t.expect((this.goToGmp).exists).ok()
        log.info("Student user successfully logged in with bceid    " + credentials.username)
        }
    }

    async bcscLogin(credentials){
        await t.click(this.virtualCardButton)
        await t.typeText(this.cardSerialNumberInput, credentials.cardNumber)
        await t.click(this.bcscContinueButton)
        await t.typeText(this.passcodeInput, credentials.passcode)
        await t.click(this.bcscContinueButton2)
        await t.click(this.bcscContinueButton2)
        log.info("student successfully logged in with BCSC    "+ credentials.cardNumber)
    }

    async clickGetMyPen() {
        await t.click(this.goToGmp , { timeout: 15000 })
        log.info("Get My Pen button is clicked")
    }

    async clickUpdateMyPen() {
        await t.click(this.goToUmp , { timeout: 15000 })
        log.info("Update My Pen button is clicked")
    }

    async overcomeAccountActivity() {

        if (await this.lastLoginWithBceid.exists && await this.lastLoginWithBceid.visible) {
            await t.click(this.doNotShowActivityCheckBox)
            await t.wait(2000)
            await t.click(this.continueButton)
            log.info("Continue Button is Clicked")
        } else {
            log.info("Account activity page not showed up")
        }
    }

    async overcomeCreateNewPenRequest() {
        await t.wait(2000)
        if (await this.createNewPenRequestButton.exists && await this.createNewPenRequestButton.visible) {
            await t.click(this.createNewPenRequestButton)
            log.info("Create new pen request button is clicked")
        } else {
            log.info("Create new pen request button did not occurred")
        }

    }

    async verifyMaintenancePageOccurred() {
        if (await this.maintenancePageText.exists) {
            log.warn('System Under Maintenance, Skipping All Scheduled Tests ')
        }
        else {
            throw new Error("Maintenance Page Did Not Occurred")
        }
    }

    async verifyMaintenancePageNotOccurred() {
        if (await this.maintenancePageText.exists) {
            throw new Error("Maintenance Page  Occurred , Test Failed")
        }
        await t
            .wait(5)
            .expect(this.username.count).eql(1)
            .expect(this.password.count).eql(1)
        log.info("Maintenance Page Did Not Occurred")
    }

    async verifyPenRequestPageLoaded() {
        if (await this.getMyPentextHeader.exists) {
            log.info("Get My Pen Request Page is Loaded, Test Passed")
        }
    }

    async clickOnDisplayName(){
        await t.click(this.displayName)
        log.info("Clicked on display name")
    }

    async clickHomeButton(){
        await t.click(this.homeButton)
        log.info("Home button is clicked")
    }

    async clickCancelButton(){
        await t.click(this.cancelButton)
        log.info("Cancel Button is clicked")
    }
}

export default studentLoginPage