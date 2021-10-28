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

        //legal and usual names of result
        this.legalLastnameTable1 = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(3) > div:nth-of-type(1) > span:nth-of-type(1) > span:nth-of-type(1) > strong:nth-of-type(1)')
        this.usualLastnameTable1 = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(3) > div:nth-of-type(1) > span:nth-of-type(1) > span:nth-of-type(1) > strong:nth-of-type(1)')
        this.legalFirstnameTable1 = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(4) > div:nth-of-type(1) > span:nth-of-type(1) > span:nth-of-type(1) > strong:nth-of-type(1)')
        this.usualFirstnameTable1 = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(4) > div:nth-of-type(1) > span:nth-of-type(1) > span:nth-of-type(1) > strong:nth-of-type(1)')
        this.legalMiddlenameTable1 = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(5) > div:nth-of-type(1) > span:nth-of-type(1) > span:nth-of-type(1) > strong:nth-of-type(1)')
        this.usualMiddlenameTable1 = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(5) > div:nth-of-type(1) > span:nth-of-type(1) > span:nth-of-type(1) > strong:nth-of-type(1)')

        this.legalLastnameTable2 = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(3) > div:nth-of-type(1) > span:nth-of-type(1) > span:nth-of-type(1)')
        this.usualLastnameTable2 = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(3) > div:nth-of-type(1) > span:nth-of-type(1) > span:nth-of-type(3)')
        this.legalFirstnameTable2 = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(4) > div:nth-of-type(1) > span:nth-of-type(1) > span:nth-of-type(1)')
        this.usualFirstnameTable2 = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(4) > div:nth-of-type(1) > span:nth-of-type(1) > span:nth-of-type(3)')
        this.legalMiddlenameTable2 = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(5) > div:nth-of-type(1) > span:nth-of-type(1) > span:nth-of-type(1)')
        this.usualMiddlenameTable2 = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(5) > div:nth-of-type(1) > span:nth-of-type(1) > span:nth-of-type(3)')

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

    async verifyThreeButtonsAreNotDisabled() {
        await t.expect(this.modifySearchButton.hasAttribute('disabled')).notOk();
        await t.expect(this.issueNewPenButton.hasAttribute('disabled')).notOk();
        await t.expect(this.requestInfoButton.hasAttribute('disabled')).notOk();
        log.info("modify search, issue new pen and request info buttons are not disabled")
    }

    async verifyIssueNewPenButtonDisabled() {
        await t.expect(this.issueNewPenButton.hasAttribute('disabled')).ok();
        log.info("issue new pen button disabled")
    }

    async VerifyFieldNameAndErrorDescription(totalNumberOfErrors, fieldName, errorDescription) {

        for (let i = 1; i <= totalNumberOfErrors; i++) {

            try {

                const fieldNameElement = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(' + i + ') > td:nth-of-type(1)')
                const errorDescriptionElement = Selector('html:nth-of-type(1) > body:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(5) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(' + i + ') > td:nth-of-type(2)')

                await t.expect(fieldNameElement.innerText).eql(fieldName)
                await t.expect(errorDescriptionElement.innerText).eql(errorDescription)
                log.info("error details verified")
                break;
            }
            catch (err) {
                // log.info("Did not find in the expected cell, moving to next cell")
            }
        }
    }

    async verifyLegalAndUsualNamesInTable1(data) {
        await t.expect(this.legalLastnameTable1.innerText).eql(data.legalLastname)
        await t.expect(this.usualLastnameTable1.innerText).eql(data.usualLastname)
        await t.expect(this.legalFirstnameTable1.innerText).eql(data.legalFirstname)
        await t.expect(this.usualFirstnameTable1.innerText).eql(data.usualFirstname)
        await t.expect(this.legalMiddlenameTable1.innerText).eql(data.legalMiddlename)
        await t.expect(this.usualMiddlenameTable1.innerText).eql(data.usualMiddlename)
        log.info("student details verified in table 1")
    }

    async verifyLegalAndUsualNamesInTable2(data) {
        await t.expect(this.legalLastnameTable2.innerText).eql(data.legalLastname)
        await t.expect(this.usualLastnameTable2.innerText).eql(data.usualLastname)
        await t.expect(this.legalFirstnameTable2.innerText).eql(data.legalFirstname)
        await t.expect(this.usualFirstnameTable2.innerText).eql(data.usualFirstname)
        await t.expect(this.legalMiddlenameTable2.innerText).eql(data.legalMiddlename)
        await t.expect(this.usualMiddlenameTable2.innerText).eql(data.usualMiddlename)
        log.info("student details verified in table 2")
    }
}
export default penRequestDetailsPage





