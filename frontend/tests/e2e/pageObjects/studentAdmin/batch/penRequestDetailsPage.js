import { Selector, t } from 'testcafe'
const log = require('npmlog')

class penRequestDetailsPage {

    constructor() {

        //buttons
        this.modifySearchButton = Selector('#modify-search-action')
        this.issueNewPenButton = Selector('#issue-pen-action')
        this.requestInfoButton = Selector('#requestInfoBtn')

        //text elements
        this.title = Selector('div:nth-of-type(1) > div:nth-of-type(1) > span:nth-of-type(1)')
        this.statusPill = Selector('span:nth-of-type(2) > span:nth-of-type(1) > strong:nth-of-type(1)')
        this.previousRecord = Selector('#preRecord')
        this.nextRecord = Selector('#nextRecord')
        this.schoolName = Selector('div:nth-of-type(2) > span:nth-of-type(1) > strong:nth-of-type(1)')

    }

    async verifyStatusPill(data) {
        await t.expect(this.statusPill.innerText).eql(data)
        log.info("status pill verified")
    }

    async clickNextRecord() {
        await t.click(this.nextRecord)
        log.info("next record button clicked")
    }

    async clickPreviousRecord() {
        await t.click(this.previousRecord)
        log.info("previous record button clicked")
    }

    async verifyTitle(data) {
        await t.expect(this.title.innerText).eql(data)
        log.info("title verified")
    }

    async verifySchoolName(data) {
        await t.expect(this.schoolName.innerText).eql(data)
        log.info("schoolname and mincode verified")
    }

    async clickModifySearchButton() {
        await t.click(this.modifySearchButton)
        log.info("modify search button clicked")
    }

    async clickIssueNewPenButton() {
        await t.click(this.issueNewPenButton)
        log.info("issue new pen button clicked")
    }

    async clickRequestInfoButton() {
        await t.click(this.requestInfoButton)
        log.info("request info button clicked")
    }

    async verifyThreeButtonsAreDisabled() {
        await t.expect(this.modifySearchButton.hasAttribute('disabled')).ok();
        await t.expect(this.issueNewPenButton.hasAttribute('disabled')).ok();
        await t.expect(this.requestInfoButton.hasAttribute('disabled')).ok();
        log.info("modify search, issue new pen and request info buttons are disabled")
    }

    async verifyIssueNewPenButtonDisabled() {
        await t.expect(this.issueNewPenButton.hasAttribute('disabled')).ok();
        log.info("issue new pen button disabled")
    }

    async VerifyFieldNameAndErrorDescription(tableRow, fieldName, errorDescription) {

        this.fieldNameElement = Selector('table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(' + tableRow + ') > td:nth-of-type(1)')
        this.errorDescriptionElement = Selector('table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(' + tableRow + ') > td:nth-of-type(2)')

        await t.expect(this.fieldNameElement.innerText).eql(fieldName)
        await t.expect(this.errorDescriptionElement.innerText).eql(errorDescription)
        log.info("error details verified")
    }
}
export default penRequestDetailsPage





