import { Selector, t } from 'testcafe'
const log = require('npmlog')
const assert = require('assert')
const nodeDate = require('date-and-time')

class staffActionOnPenPage {

    constructor() {

        // as of and submitted related selectors
        this.status = Selector('#requestStatus').child('strong')
        this.asOf = Selector('#asOfDate')
        this.submittedTime = Selector('#submittedDate')

        // Claim, Release, Back To List Buttons
        this.claimButton = Selector('#claim-pen-request')
        this.releaseButton = Selector('#release-request')
        this.backToListButton = Selector('#back-to-list')
        this.claimConformationText = Selector('div:nth-of-type(1) > p:nth-of-type(1) > strong:nth-of-type(1)')

        //Provide PEN related selectors
        this.providePenButton = Selector('#complete-tab')
        this.providePenInput = Selector('#pen-search-text-field')
        this.providePenToStudentButton = Selector('#provide-pen-to-student')

        //Request info related selectors
        this.requestInfoButton = Selector('#return-tab')
        this.requestInfoTextBox = Selector('#return-comment-textarea')
        this.returnToStudentButton = Selector('#return-to-student')

        //Reject pen related selectors
        this.rejectButton = Selector('#reject-tab')
        this.rejectTextBox = Selector('#reject-comment-textarea')
        this.rejectPenRequestButton = Selector('#reject-request')


        //Unlink Pen related selectors
        this.studentDemoChangedCheckBox = Selector('input').withAttribute('role', 'checkbox')
        this.unlinkButton = Selector('#unlink-button')

        //last name of the student
        this.fullNameOfStudent2 = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > p:nth-of-type(1) > strong:nth-of-type(1)')

        //Pen Demographics displayed
        this.penNumber = Selector('#penNumber').child('strong')
        this.legal = Selector('#legalNames').child('strong')
        this.usual = Selector('#usualNames').child('strong')
        this.dob = Selector('#studentDOB').child('strong')
        this.gender = Selector('#studentGender').child('strong')

    }

    async clickClaimButton() {
        await t.click(this.claimButton)
        log.info("claim button is clicked")
    }

    async clickReleaseButton() {
        await t.click(this.releaseButton)
        log.info("clicked release button")
    }

    async verifyClaimConformation(data) {
        log.info('Claim conformation text displayed as    ' + await this.claimConformationText.innerText)
        await t.expect(this.claimConformationText.innerText).eql(data, { timeout: 10000 })
    }

    async actionConfirmationText(data) {
        log.info('Action conformation text displayed as    ' + await this.claimConformationText.innerText)
        await t.expect(this.claimConformationText.innerText).eql(data + " completed this request", { timeout: 10000 })
    }

    async clickBackToListButton() {
        await t.click(this.backToListButton)
        log.info("Back to list button is clicked")
    }

    async clickProvidePenButton() {
        await t.click(this.providePenButton)
        log.info("Clicked Provide Pen Button")
    }

    async providePenNumber(data) {
        await t.typeText(this.providePenInput, data)
        log.info("entered pen number")
    }

    async clickProvidePenToStudentButton(data) {
        await t.click(this.providePenToStudentButton)
        log.info("clicked provide pen to student button")
        await t.expect(this.status.innerText).eql(data, { timeout: 240000 })
        log.info(await this.status.innerText + ' text is displayed')
    }

    async clickProvidePenButtonAndUnlink(data) {
        await t.click(this.providePenToStudentButton)
        log.info("clicked provide pen to student button")
        await t.wait(1000)
        await t.click(this.unlinkButton)
        log.info("Unlink Button is clicked")
        await t.expect(this.status.innerText).eql(data, { timeout: 240000 })
        log.info(await this.status.innerText + ' text is displayed')
    }

    async verifyPenDemographics(penNumber, penDemographics, environment) {


        await t.expect(this.penNumber.innerText).eql(penNumber, { timeout: 180000 })
        log.info("Pen number verified in pen demographics")

        if (penDemographics.Legal) {

            if (environment == "test" || environment == "dev") {

                assert.strictEqual(penDemographics.Legal, await this.legal.innerText)
                log.info("Legal name verified in pen demographics")

            }
        }
        if (penDemographics.LegalUat) {

            if (environment == "uat" || environment == "pre-prod") {
                assert.strictEqual(penDemographics.LegalUat, await this.legal.innerText)
                log.info("Legal name verified in pen demographics")
            }
        }

        if (penDemographics.Usual) {

            if (environment == "test" || environment == "dev") {
                assert.strictEqual(penDemographics.Usual, await this.usual.innerText)
                log.info("Usual name verified in pen demographics")

            }
        }
        if (penDemographics.UsualUat) {
            
            if (environment == "uat" || environment == "pre-prod") {

                assert.strictEqual(penDemographics.UsualUat, await this.usual.innerText)
                log.info("Usual name verified in pen demographics")

            }
        }


        if (penDemographics.DOB) {
            assert.strictEqual(penDemographics.DOB, await this.dob.innerText)
            log.info("DOB verified in pen demographics")
        }
        if (penDemographics.Gender) {
            assert.strictEqual(penDemographics.Gender, await this.gender.innerText)
            log.info("Gender verified in pen demographics")
        }
    }

    async clickRequestInfoButton() {
        await t.click(this.requestInfoButton)
        log.info('Request information button is clicked')
    }

    async setRequestInfoTextBox(data) {
        await t.typeText(this.requestInfoTextBox, data)
        log.info('Request information provided')
    }


    async clickReturnToStudentButton(data) {
        await t.click(this.returnToStudentButton)
        log.info('Return to student button is clicked')
        await t.expect(this.status.innerText).eql(data, { timeout: 180000 })
        log.info(await this.status.innerText + ' text is displayed')
    }

    async clickRejectButton() {
        await t.click(this.rejectButton)
        log.info("Reject tab button is clicked")
    }

    async setRejectTextBox(data) {
        await t.typeText(this.rejectTextBox, data)
        log.info("Reject information provided")
    }

    async clickRejectPenRequestButton(data) {
        await t.wait(2000)
        await t.click(this.rejectPenRequestButton)
        log.info("Reject pen request button is clicked")
        await t.expect(this.status.innerText).eql(data, { timeout: 180000 })
        log.info(await this.status.innerText + ' text is displayed')

    }

    async checkLastName(data) {
        const verify = await (this.fullNameOfStudent2).innerText
        log.warn("name displayed inside the application after the request submitted    " + verify)
        await t.expect(verify).notContains(data)
        log.info("Test passed")

    }

    async clickReturnToStudentButtonReadOnly(data) {
        await t.click(this.returnToStudentButton)
        log.info('Return to student button is clicked')
        await t.wait(10000)
        log.info("Pen request expected status********  " + data)
        log.info("Pen request actual status********  " + await this.status.innerText)
        await t.expect(this.status.innerText).eql(data, { timeout: 180000 })
        log.info('Staff is not able to perform the request more information action, Read only roles verified')
    }

    async verifyClaimButtonDisabled() {
        await t.expect(this.claimButton.hasAttribute('disabled')).ok();
        log.info("Claim button is disabled")
    }

    async verifyReturnToStudentButtonDisabled() {
        await t.expect(this.returnToStudentButton.hasAttribute('disabled')).ok();
        log.info("Return to Student button is disabled")
    }

    async verifyProvidePenButtonDisabled() {
        await t.expect(this.providePenToStudentButton.hasAttribute('disabled')).ok();
        log.info("Provide Pen to Student button is disabled")
    }

    async verifyRejectButtonDisabled() {
        await t.expect(this.rejectPenRequestButton.hasAttribute('disabled')).ok();
        log.info("Reject button is disabled")
    }

    async today() {
        let date = new Date()

        if (process.env.CI) {
            date.setHours(date.getHours() - 7)
            log.info("Time zone set to PST")
        }

        return nodeDate.format(date, 'YYYY/MM/DD')
    }

    async verifyasOfDate() {
        log.info("Today is    " + await this.today())
        log.info("As of date is    " + await this.asOf.innerText)
        await t.expect(this.asOf.innerText).contains(await this.today())
    }

    async verifySubmittedDate() {
        log.info("Today is    " + await this.today())
        log.info("Submitted date is    " + await this.submittedTime.innerText)
        await t.expect(this.submittedTime.innerText).contains(await this.today())
    }

    async verifySubmittedDateEmpty() {
        log.info('Submitted date is ' + await this.submittedTime.innerText)
        await t.expect(this.submittedTime.innerText).eql('')
    }

    async clickStudentDemoChangedTextBox() {
        await t.click(this.studentDemoChangedCheckBox)
        log.info("Student demographics changed check box is clicked")
    }

    async clickUnlinkButton(data) {
        await t.click(this.unlinkButton)
        log.info("Unlink button is clicked")
        await t.expect(this.status.innerText).eql(data, { timeout: 180000 })
        log.info(await this.status.innerText + ' text is displayed')
    }


    async waitForButtonsToBeDisabled(data) {
        for (let i = 0; i <= 300; i++) {
            try {
                await t.expect(this.claimButton.hasAttribute('disabled')).ok();
                log.info("Claim button is disabled")

                await t.expect(this.returnToStudentButton.hasAttribute('disabled')).ok();
                log.info("Return to Student button is disabled")

                await t.expect(this.status.innerText).eql(data, { timeout: 180000 })
                log.info(await this.status.innerText + ' text is displayed')
                break
            }
            catch (error) {
                await t.wait(500)
                log.info("retrying to verify buttons go disabled")

                if (i === 299) {
                    throw new Error("Test failed, Buttons never go disable,  check saga")
                }
            }

        }
    }

    async verifyUploadedFiles(tr,type, name) {
        this.documentType = Selector('tr:nth-child('+tr+') td.text-start:nth-child(1)')
        this.documentName = Selector('tr:nth-child('+tr+') td.text-start:nth-child(2)')
        await t.expect(this.documentType.innerText).eql(type, { timeout: 10000 })
        await t.expect(this.documentName.innerText).eql(name, { timeout: 10000 })
        log.info("student uploads verified")
    }

    async waitForRejectButton() {
        await t.wait(5000)
        await t.expect(this.rejectPenRequestButton.count).eql(1)
        log.info("redirect complete")
    }

}

export default staffActionOnPenPage
