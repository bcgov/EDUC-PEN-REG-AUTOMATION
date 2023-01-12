import { Selector, t } from 'testcafe'
const log = require('npmlog')
const assert = require('assert')
const nodeDate = require('date-and-time')

class staffStudentSearchPage {

    constructor() {

        // Search input fields
        this.pen = Selector('#pen')
        this.legalSurname = Selector('#legalLastName')
        this.usualSurname = Selector('#usualLastName')
        this.legalGiven = Selector('#legalFirstName')
        this.usualGiven = Selector('#usualFirstName')
        this.legalMiddle = Selector('#legalMiddleNames')
        this.usualMiddle = Selector('#usualMiddleNames')
        this.postalCode = Selector('#postalCode')
        this.memo = Selector('#memo')
        this.gender = Selector('#genderCode')
        this.localID = Selector('#localID')
        this.birthDate = Selector('#dob')
        this.grade = Selector('#gradeCode')
        this.mincode = Selector('#mincode')

        // Buttons
        this.advancedSearchButton = Selector('#search-type-action')
        this.standardSearchButton = Selector('#search-type-action')
        this.clearButon = Selector('#search-clear')
        this.searchButton = Selector('#perform-search')
        this.createNewPenButton = Selector('#create-new-pen')
        this.createNewPenSubmitButton = Selector('#createNewPENSubmitButton')



        // Search result related
        this.penSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(2) div:nth-child(1) > span.top-column-item:nth-child(1)')
        this.mergedSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(2) div:nth-child(1) > span.bottom-column-item:nth-child(4)')
        this.legalSurnameSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(3) div:nth-child(1) > span.top-column-item:nth-child(1)')
        this.usualSurnameSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(3) div:nth-child(1) > span.bottom-column-item:nth-child(4)')
        this.legalGivennameSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(4) div:nth-child(1) > span.top-column-item:nth-child(1)')
        this.usualGivennameSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(4) div:nth-child(1) > span.bottom-column-item:nth-child(4)')
        this.legalMiddlenameSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(5) div:nth-child(1) > span.top-column-item:nth-child(1)')
        this.usualMiddlenameSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(5) div:nth-child(1) > span.bottom-column-item:nth-child(4)')
        this.postalCodeSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(6) div:nth-child(1) > span.top-column-item:nth-child(1)')
        this.memoSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(6) div:nth-child(1) > span.bottom-column-item:nth-child(4)')
        this.dcSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(7) div:nth-child(1) > span.top-column-item:nth-child(1)')
        this.localIdSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(7) div:nth-child(1) > span.bottom-column-item:nth-child(4)')
        this.genderSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(7) div:nth-child(1) > span.double-column-item:nth-child(2)')
        this.birthDateSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(8) div:nth-child(1) > span.top-column-item:nth-child(1)')
        this.gradeSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(8) div:nth-child(1) > span.bottom-column-item:nth-child(4)')
        this.mincodeSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(9) div:nth-child(1) > span.top-column-item:nth-child(1)')
        this.twinnedSearchResult = Selector('div.v-data-table__wrapper tbody:nth-child(3) tr:nth-child(1) td:nth-child(9) div:nth-child(1) > span.bottom-column-item:nth-child(4)')


        //Advanced Search Related Selectors
        this.birthYearStart = Selector('#start-dob-year')
        this.birthMonthStart = Selector('#start-dob-month')
        this.birthDayStart = Selector('#start-dob-day')
        this.useDobCheckBox = Selector('#useDOBCheckbox')
        this.useRangeCheckBox = Selector('#useDOBRangeCheckbox')
        this.birthYearEnd = Selector('#end-dob-year')
        this.birthMonthEnd = Selector('#end-dob-month')
        this.birthDayEnd = Selector('#end-dob-day')
        this.gender = Selector('#gender')
        this.nameVariantCheckBox = Selector('#searchNameVariantsCheckbox')
        this.searchAuditHistoryCheckBox = Selector('#searchAuditHistoryCheckbox')

        //side menu
        this.hamburgerMenuButton = Selector('#menuBtn')
        this.dashboardLink = Selector('#DashboardMenuBtn')
        this.searchResult = Selector('table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(2) > div:nth-of-type(1)')
        this.fullSearchButton = Selector('span').withText('Advanced Student Search')
        this.saveButton = Selector('span').withText('Save')


    }

    async setPen(data) {
        await t.typeText(this.pen, data)
        log.info("Pen number is set")
    }

    async setLegalSurname(data) {
        await t.typeText(this.legalSurname, data)
        log.info("legal surname is set")
    }

    async setUsualSurname(data) {
        await t.typeText(this.usualSurname, data)
        log.info("ususal surname is set")
    }

    async setLegalGiven(data) {
        await t.typeText(this.legalGiven, data, { replace: true })
        log.info("legal given name is set")
    }

    async setUsualGiven(data) {
        await t.typeText(this.usualGiven, data)
        log.info("usual given is set")
    }

    async setLegalMiddle(data) {
        await t.typeText(this.legalMiddle, data)
        log.info("legal middle name is set")
    }

    async setUsualMiddle(data) {
        await t.typeText(this.usualMiddle, data)
        log.info("usual middle name is set")
    }

    async setPostalCode(data) {
        await t.typeText(this.postalCode, data)
        log.info("postal code is set")
    }

    async setMemo(data) {
        await t.typeText(this.memo, data)
        log.info("memo is set")
    }

    async setGender(data) {
        this.genderDropdown = Selector('#genderCol')
        await t.click(this.genderDropdown)
        await t.wait(1000)
        this.genderData = Selector('div').withExactText(data)
        await t.click(this.genderData)
        log.info("gender set")
    }

    async setLocalID(data) {
        await t.typeText(this.localID, data)
        log.info("local ID is set")
    }

    async setBirthdate(data) {
        await t.typeText(this.birthDate, data)
        log.info("Birthdate is set")
    }

    async setGrade(data) {
        await t.typeText(this.grade, data)
        log.info("student grade is set")
    }

    async setMincode(data) {
        await t.typeText(this.mincode, data)
        log.info("min code is set")
    }

    async clickAdvanceSearchButton() {
        await t.click(this.advancedSearchButton)
        log.info("advanced search button is clicked")
    }

    async clickClearButton() {
        await t.click(this.clearButon)
        log.info("clear button is clicked")
    }

    async clickSearchButton() {
        await t.click(this.searchButton)
        log.info("Search button is clicked")
    }

    async clickCreateNewPenButton() {
        await t.click(this.createNewPenButton)
        log.info("create new pen button clicked")
    }

    async verifyCreateNewPenButtonDisabled() {
        await t.expect(this.createNewPenButton.hasAttribute('disabled')).ok();
        log.info("create new pen button disabled")
    }

    async verifyCreateNewPenButtonEnabled() {
        await t.expect(this.createNewPenButton.hasAttribute('disabled')).notOk();
        log.info("create new pen button enabled")
    }
    async clickOnFirstSearchResult() {
        await t.click(this.penSearchResult)
        log.info("clicked on first search result")
    }

    async verifyStudentSearchResult(penNumber, data) {

        await t.expect(this.penSearchResult.innerText).eql(penNumber+" ", { timeout: 100000 })

        await t.expect(this.mergedSearchResult.innerText).eql(data.mergedSearchResult)

        await t.expect(this.legalSurnameSearchResult.innerText).eql(data.legalSurnameSearchResult)

        if (data.legalSurnameSearchResult != data.usualSurnameSearchResult) {
            await t.expect(this.usualSurnameSearchResult.innerText).eql(data.usualSurnameSearchResult)
        }

        await t.expect(this.legalGivennameSearchResult.innerText).eql(data.legalGivennameSearchResult)

        if (data.legalGivennameSearchResult != data.usualGivennameSearchResult) {
            await t.expect(this.usualGivennameSearchResult.innerText).eql(data.usualGivennameSearchResult)
        }

        await t.expect(this.legalMiddlenameSearchResult.innerText).eql(data.legalMiddlenameSearchResult)

        if (data.legalMiddlenameSearchResult != data.usualMiddlenameSearchResult) {
            await t.expect(this.usualMiddlenameSearchResult.innerText).eql(data.usualMiddlenameSearchResult)
        }
        await t.expect(this.postalCodeSearchResult.innerText).eql(data.postalCodeSearchResult)

        // await t.expect(this.memoSearchResult.innerText).eql(data.memoSearchResult)

        await t.expect(this.dcSearchResult.innerText).eql(data.dcSearchResult)

        await t.expect(this.localIdSearchResult.innerText).eql(data.localIdSearchResult)

        await t.expect(this.genderSearchResult.innerText).eql(data.genderSearchResult)

        await t.expect(this.birthDateSearchResult.innerText).eql(data.birthDateSearchResult)

        await t.expect(this.gradeSearchResult.innerText).eql(data.gradeSearchResult)

        await t.expect(this.mincodeSearchResult.innerText).eql(data.mincodeSearchResult)

        log.info("Student Search Results Verified")
    }

    async setDobRange(data) {
        await t.typeText(this.birthYearStart, data.birthYearStart)
        await t.typeText(this.birthMonthStart, data.birthMonthStart)
        await t.typeText(this.birthDayStart, data.birthDayStart)
        await t.click(this.useRangeCheckBox, { timeout: 3000 })
        await t.typeText(this.birthYearEnd, data.birthYearEnd)
        await t.typeText(this.birthMonthEnd, data.birthMonthEnd)
        await t.typeText(this.birthDayEnd, data.birthDayEnd)
        log.info("Birthdate range set")
    }


    async verifyClearButtonAction() {
        await t
            .wait(5)
            .expect(this.birthYearEnd.count).eql(1)

        await t.click(this.clearButon)
        await t
            .wait(5)
            .expect(this.birthYearEnd.count).eql(0)
        log.info("clear button functionality verified")
    }

    async verifyDetailsOfNewPenCreated(studentData) {

        await t.expect(this.legalSurnameSearchResult.innerText).eql(studentData.legalSurname, { timeout: 15000 })

        await t.expect(this.usualSurnameSearchResult.innerText).eql(studentData.usualSurname)

        await t.expect(this.legalGivennameSearchResult.innerText).eql(studentData.legalGivenname)

        await t.expect(this.usualGivennameSearchResult.innerText).eql(studentData.usualGivenname)

        await t.expect(this.legalMiddlenameSearchResult.innerText).eql(studentData.legalMiddlename)

        await t.expect(this.usualMiddlenameSearchResult.innerText).eql(studentData.usualMiddlename)

        await t.expect(this.postalCodeSearchResult.innerText).eql(studentData.postalCode)

        await t.expect(this.memoSearchResult.innerText).eql(studentData.memo)

        await t.expect(this.dcSearchResult.innerText).eql(studentData.dc)

        await t.expect(this.localIdSearchResult.innerText).eql(studentData.localId)

        await t.expect(this.genderSearchResult.innerText).eql(studentData.gender)

        await t.expect(this.birthDateSearchResult.innerText).eql(studentData.birthDateSearchResult)

        await t.expect(this.gradeSearchResult.innerText).eql(studentData.grade)

        await t.expect(this.mincodeSearchResult.innerText).eql(studentData.mincode)

        await t.expect(this.twinnedSearchResult.innerText).eql(studentData.twinned)

        log.info("New Student Search Results Verified")
    }


    async clickSearchNameVariantsCheckBox() {
        await t.click(this.nameVariantCheckBox, { timeout: 3000 })
        log.info("Search name variants checkbox selected")
    }

    async verifyTableCell(data) {
        await t.expect((Selector('span').withExactText(data)).exists).ok({timeout: 60000})
        log.info("Following Text verified    " + data)
    }

    async setDateOfBirth(data) {
        await t.typeText(this.birthYearStart, data.birthYearStart)
        await t.typeText(this.birthMonthStart, data.birthMonthStart)
        await t.typeText(this.birthDayStart, data.birthDayStart)
        log.info("Birthdate set")
    }

    async clickCreateNewPenSubmitButton() {
        await t.click(this.createNewPenSubmitButton)
        log.info("Create pen button on model clicked")
    }

    async clickAuditHistoryCheckbox() {
        await t.click(this.searchAuditHistoryCheckBox)
        log.info("Audit history checkbox clicked")
    }

    async searchAndUpdateStudent(data) {

        for (let i = 0; i < 5; i++) {

            await t.typeText(this.legalSurname, data[i].current.lastname)
            await t.typeText(this.legalGiven, data[i].current.firstname)
            await t.typeText(this.localID, data[i].current.localID)
            await t.typeText(this.mincode, data[i].current.mincode)
            await t.click(this.searchButton)
            await t.click(this.searchResult)

            await t.resizeWindow(1920, 1080)
            await t.wait(2000)

            await t.typeText(this.localID, data[i].updates.localID, { replace: true })
            await t.typeText(this.mincode, data[i].updates.mincode, { replace: true })

            await t.click(this.saveButton)
            log.info("save button is clicked")
            await t.wait(3000)

            await t.click(this.hamburgerMenuButton)
            log.info("Hamburger menu button is clicked")

            await t.click(this.dashboardLink)
            log.info("Dashboard link is clicked")

            await t.click(this.fullSearchButton)
            log.info("Full search button is clicked")
        }
        log.info("batch student details updated")
    }

    async verifyStudentDetailsUpdated(data) {

        for (let i = 0; i < 5; i++) {

            await t.typeText(this.legalSurname, data[i].current.lastname)
            await t.typeText(this.legalGiven, data[i].current.firstname)
            await t.typeText(this.localID, data[i].current.localID)
            await t.typeText(this.mincode, data[i].current.mincode)
            await t.click(this.searchButton)

            await t.expect(this.localIdSearchResult.innerText).eql(data[i].current.localID)
            await t.expect(this.mincodeSearchResult.innerText).eql(data[i].current.mincode)

            await t.click(this.clearButon)
        }
        log.info("batch student search results verified")
    }

    async waitFor14Minutes(){
        log.info("Implicit wait started")
        await t.wait(840000)
        log.info("Implicit wait completed")
    }

    async setDobYear(data){
        await t.typeText(this.birthYearStart, data)
        log.info("dob year set")
    }



}
export default staffStudentSearchPage