import { Selector, t } from 'testcafe'
const log = require('npmlog')

class createNewPenPage {

    constructor() {

        this.enterDataAndSearchButton = Selector("#enter-data-search-action")

        this.legalSurname = Selector("#searchDemogModalLegalLastNameTxtField")
        this.legalGivenName = Selector("#searchDemogModalLegalFirstNameTxtField")
        this.legalMiddleNames = Selector("#searchDemogModalLegalMiddleNameTxtField")

        this.ususalSurname = Selector("#searchDemogModalUsualLastNameTxtField")
        this.usualGivenName = Selector("#searchDemogModalUsualFirstNameTxtField")
        this.usualMiddleNames = Selector("#searchDemogModalUsualMiddleNameTxtField")

        this.gender = Selector("#searchDemogModalGenderTxtField")
        this.birthDate = Selector("#searchDemogModalDobTxtField")
        this.grade = Selector("#searchDemogModalGradeTxtField")
        this.postalCode = Selector("#searchDemogModalPostalCodeTxtField")
        this.mincode = Selector("#searchDemogModalMincodeTxtField")

        this.cancelButton = Selector("#cancel")
        this.searchButton = Selector("#searchDemogModalSearchBtn")

        this.issueNewPenButton = Selector("#issue-pen-action")



    }


    async clickEnterDataButton() {
        await t.click(this.enterDataAndSearchButton)
        log.info("enter data and search button is clicked")
    }


    async setLegalSurname(data) {
        await t.typeText(this.legalSurname, data)
        log.info("legal surname is set")
    }

    async setLegalGivenName(data) {
        await t.typeText(this.legalGivenName, data)
        log.info("legal given name is set")
    }

    async setLegalMiddleNames(data) {
        await t.typeText(this.legalMiddleNames, data)
        log.info("legal middle names set")
    }

    async setUsualSurname(data) {
        await t.typeText(this.ususalSurname, data)
        log.info("usual surname is set")
    }

    async setUsualGivenName(data) {
        await t.typeText(this.usualGivenName, data)
        log.info("usual given name is set")
    }

    async setUsualMiddleNames(data) {
        await t.typeText(this.usualMiddleNames, data)
        log.info("usual middle names set")
    }

    async setGender(data) {
        await t.typeText(this.gender, data)
        log.info("gender set")
    }

    async setBirthDate(data) {
        await t.typeText(this.birthDate, data)
        log.info("birthdate is set")
    }

    async setGrade(data) {
        await t.typeText(this.grade, data)
        log.info("grade code set")
    }

    async setPostalCode(data) {
        await t.typeText(this.postalCode, data)
        log.info("postal code is set")
    }

    async setMincode(data) {
        await t.typeText(this.mincode, data)
        log.info("mincode is set")
    }

    async clickCancelButton() {
        await t.click(this.cancelButton)
        log.info("cancel button is clicked")
    }

    async clickSearchButton() {
        await t.click(this.searchButton)
        log.info("search button is clicked")
    }

    async clickIssueNewPenButton() {
        await t.click(this.issueNewPenButton)
        log.info("Issue new pen button is clicked")
    }

    async verifyValidationErrors(data, num) {

        this.nameValidationError = Selector('td').withExactText(data)

        await t.expect(this.nameValidationError.count).eql(num)
    }

} export default createNewPenPage