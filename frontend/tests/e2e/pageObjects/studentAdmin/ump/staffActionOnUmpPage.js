import { Selector, t } from 'testcafe'
const log = require('npmlog')
const assert = require('assert')
const nodeDate = require('date-and-time')

class staffActionOnUmpPage {


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

        //Send Changes to student related selectors
        this.refreshStudentButton = Selector('#refresh-student-info')
        this.completeCommentTextBox = Selector('#complete-comment-textarea')
        this.sendChangesButton = Selector('#send-changes-to-student').filterVisible()
        this.confirm = Selector('#confirm-request-changes')
        this.cancel = Selector('#cancel-request-changes')

        //Request info related selectors
        this.requestInfoButton = Selector('#return-tab')
        this.requestInfoTextBox = Selector('#return-comment-textarea')
        this.returnToStudentButton = Selector('#return-to-student').filterVisible()


        //Reject pen related selectors
        this.rejectButton = Selector('#reject-tab')
        this.rejectTextBox = Selector('#reject-comment-textarea')
        this.rejectPenRequestButton = Selector('#reject-request').filterVisible()

        //Pen Demographics displayed
        this.penNumber = Selector('#recordedPEN').child('strong')
        this.first = Selector('#legalFirstName').child('strong')
        this.middle = Selector('#legalMiddleName').child('strong')
        this.last = Selector('#legalLastName').child('strong')
        this.dob = Selector('#studentDOB').child('strong')
        this.gender = Selector('#studentGender').child('strong')


    }

    async clickClaimButton() {
        await t.click(this.claimButton)
        log.info("claim button is clicked")
    }

    async verifyClaimButtonDisabled() {
        await t.expect(this.claimButton.hasAttribute('disabled')).ok();
        log.info("Claim button is disabled")
    }

    async verifyClaimConformation(data) {
        log.info('Claim conformation text displayed as    ' + await this.claimConformationText.innerText)
        await t.expect(this.claimConformationText.innerText).eql(data, { timeout: 10000 })
    }

    async actionConfirmationText(data) {
        log.info('Action conformation text displayed as    ' + await this.claimConformationText.innerText)
        assert.strictEqual(data + " completed this request", await this.claimConformationText.innerText)
    }

    async clickBackToListButton() {
        await t.click(this.backToListButton)
        log.info("Back to list button is clicked")
    }


    async clickRequestInfoButton() {
        await t.click(this.requestInfoButton)
        log.info('Request information button is clicked')
    }

    async setRequestInfoTextBox(data) {
        await t.typeText(this.requestInfoTextBox, data)
        log.info('Request information provided')
    }


    async verifyReturnToStudentButtonDisabled() {
        await t.expect(this.returnToStudentButton.hasAttribute('disabled')).ok();
        log.info("Return to Student button is disabled")
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
        await t.click(this.rejectPenRequestButton)
        log.info("Reject pen request button is clicked")
        await t.expect(this.status.innerText).eql(data, { timeout: 180000 })
        log.info(await this.status.innerText + ' text is displayed')

    }

    async verifyRejectButtonDisabled() {
        await t.expect(this.rejectPenRequestButton.hasAttribute('disabled')).ok();
        log.info("Reject request button is disabled")
    }

    async clickRejectButtonReadOnly(data) {
        await t.click(this.rejectPenRequestButton)
        await t.wait(10000)
        log.info("Ump request expected status********  " + data)
        log.info("Ump request actual status********  " + await this.status.innerText)
        assert.strictEqual(data, await this.status.innerText)
        log.info('Staff is not able to perform the request more information action, Read only roles verified')
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
        assert.strictEqual(data, await this.status.innerText)
        log.info('Staff is not able to perform the request more information action, Read only roles verified')
    }


    async verifyProvidePenButtonDisabled() {
        await t.expect(this.providePenToStudentButton.hasAttribute('disabled')).ok();
        log.info("Provide Pen to Student button is disabled")
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

    async clickRefreshStudentInfoButton() {
        await t.click(this.refreshStudentButton)
        log.info("refresh student button is clicked")
    }

    async setCompleteComment(data) {
        await t.typeText(this.completeCommentTextBox, data)
        log.info("complete comment box is set")
    }

    async clickSendChangesToStudentButton() {
        await t.wait(5000)
        await t.click(this.sendChangesButton)
        log.info("send changes to student button is clicked")
    }

    async confirmSubmission(data) {
        await t.wait(5000)
        await t.click(this.confirm)
        log.info("Confirm changes button is clicked")
        await t.expect(this.status.innerText).eql(data, { timeout: 180000 })
        log.info(await this.status.innerText + ' text is displayed')
    }

    async verifyPenDemographics(penNumber, penDemographics) {

        await t.expect(this.penNumber.innerText).eql(penNumber, { timeout: 180000 })
        log.info("Pen number verified in pen demographics")

        assert.strictEqual(penDemographics.First, await this.first.innerText)
        log.info("first name verified in pen demographics")

        assert.strictEqual(penDemographics.Middle, await this.middle.innerText)
        log.info("Middle name verified in pen demographics")

        assert.strictEqual(penDemographics.Last, await this.last.innerText)
        log.info("last name verified in pen demographics")

        assert.strictEqual(penDemographics.DOB, await this.dob.innerText)
        log.info("DOB verified in pen demographics")

        // assert.strictEqual(penDemographics.Gender, await this.gender.innerText)
        // log.info("Gender verified in pen demographics")

    }

    async verifyUploadedFiles(tr, type, name) {
        this.documentType = Selector('tr:nth-child(' + tr + ') td.text-start:nth-child(1)')
        this.documentName = Selector('tr:nth-child(' + tr + ') td.text-start:nth-child(2)')
        await t.expect(this.documentType.innerText).eql(type, { timeout: 10000 })
        await t.expect(this.documentName.innerText).eql(name, { timeout: 10000 })
        log.info("student uploads verified")
    }
}

export default staffActionOnUmpPage
