import { execPath } from 'process'
import { Selector, t } from 'testcafe'
const log = require('npmlog')
const assert = require('assert')

class studentDetailsPage {

    constructor() {


        //Student details related Selectors
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

        //cancel and save buttons
        this.cancelButton = Selector('span').withText('Cancel')
        this.saveButton = Selector('span').withText('Save')

        //twin record related
        this.twinRecordYes = Selector('a').withText('Yes')
        this.twinsNumber = Selector('#twins-number')

    }

    async setPen(data) {
        await t.typeText(this.pen, data, { paste: true })
        log.info("Pen number is set")
    }

    async setLegalSurname(data) {
        await t.typeText(this.legalSurname, data, { paste: true })
        log.info("legal surname is set")
    }

    async setUsualSurname(data) {
        this.clearUsualSurname()
        await t.click(this.usualSurname)
        await t.typeText(this.usualSurname, data, { paste: true })
        log.info("ususal surname is set")
    }

    async clearUsualSurname() {
        await t
            .click(this.usualSurname)
            .pressKey('ctrl+a delete')
        log.info("usual surname input cleared")
    }

    async setLegalGiven(data) {
        await t.typeText(this.legalGiven, data, { paste: true })
        log.info("legal given name is set")
    }

    async setUsualGiven(data) {
        this.clearUsualGiven()
        await t.click(this.usualGiven)
        await t.typeText(this.usualGiven, data, { paste: true })
        log.info("usual given is set")
    }

    async clearUsualGiven() {
        await t
            .click(this.usualGiven)
            .pressKey('ctrl+a delete')
        log.info("usual given input cleared")
    }

    async setLegalMiddle(data) {
        await t.typeText(this.legalMiddle, data, { paste: true })
        log.info("legal middle name is set")
    }

    async setUsualMiddle(data) {
        this.clearUsualMiddle()
        await t.click(this.usualMiddle)
        await t.typeText(this.usualMiddle, data, { paste: true })
        log.info("usual middle name is set")
    }

    async clearUsualMiddle() {
        await t
            .click(this.usualMiddle)
            .pressKey('ctrl+a delete')
        log.info("usual middle input cleared")
    }

    async setPostalCode(data) {
        await t.typeText(this.postalCode, data, { paste: true })
        log.info("postal code is set")
    }

    async setMemo(data) {
        await t.click(this.memo)
        await t.typeText(this.memo, data, { paste: true })
        log.info("memo is set")
    }

    async setGender(data) {
        await t.typeText(this.gender, data, { paste: true })
        log.info("student gender is set")
    }

    async setLocalID(data) {
        await t.typeText(this.localID, data, { paste: true })
        log.info("local ID is set")
    }

    async setBirthdate(data) {
        await t.typeText(this.birthDate, data, { paste: true })
        log.info("Birthdate is set")
    }

    async setGrade(data) {
        await t.typeText(this.grade, data, { paste: true })
        log.info("student grade is set")
    }

    async setMincode(data) {
        await t.typeText(this.mincode, data, { paste: true })
        log.info("min code is set")
    }


    async clickCancelButton() {
        await t.click(this.cancelButton)
        log.info("cancel button is clicked")
    }

    async clickSaveButton() {
        await t.click(this.saveButton)
        log.info("save button is clicked")
        await t.wait(3000)
    }

    async clickOnTwinRecordYes() {
        await t.click(this.twinRecordYes)
        log.info("clicked on twin record")
    }

    async verifyTwinsNumber(data) {
        await t.expect(this.twinsNumber.innerText).eql(data, { timeout: 10000 })
        log.info("verified number of twins displayed on popup module")
    }

    async clearMemo(){
        await t
        .click(this.memo)
        .pressKey('ctrl+a delete')
    log.info("usual middle input cleared")
    }

    async getText() {
        const table = Selector('table:nth-child(1)')

        const rowCount = await table.find('tr').count
        log.info("row count    "+ rowCount)

        const columnCount = await table.find('tr').nth(1).find('td').count
        log.info("column count    "+ columnCount)

        for(let i = 1; i < rowCount; i++) {
            for(let j = 0; j < columnCount; j++) {  
                let tdText = await table.find('tr').nth(i).find('td').nth(j).textContent
            }
        }
    }



} export default studentDetailsPage