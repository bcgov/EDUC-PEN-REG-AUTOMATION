import { Selector, t } from 'testcafe'
const log = require("npmlog")
class penRequestForm {

    constructor() {

        this.topCheckBox = Selector('input:nth-of-type(1)')
        this.legaLastlName = Selector('#legalLastName')
        this.legalFirstName = Selector('#legalFirstName')
        this.legalMiddleName = Selector('#legalMiddleNames')
        this.usualLastName = Selector('#usualLastName')
        this.usualFirstName = Selector('#usualFirstName')
        this.usualMiddleName = Selector('#usualMiddleNames')
        this.maidenName = Selector('#maidenName')
        this.pastName = Selector('#pastNames')
        this.email = Selector('#email')
        this.lastBCSchool = Selector('#lastBCSchool')
        this.lastBCStudentNumber = Selector('#lastBCStudentNumber')
        this.currentSchool = Selector('#currentSchool')
        this.bottomCheckBox = Selector('#acceptance_chk')
        this.submitForm = Selector('#submit_form')
        this.submitConfirmation = Selector('strong:nth-child(1)')

    }

    async fillRequestForm(studentData, submitBool) {

        await t.click(Selector('input:nth-of-type(1)', { timeout: 1000 }))
        log.info("Top checkbox is clicked")
        await t
            .wait(5)
            .expect(this.legaLastlName.count).eql(1)

        if (studentData.legalLastName) {
            await t.typeText(this.legaLastlName, studentData.legalLastName, { paste: true })
            log.info("Legal LastName entered")
        }
        if (studentData.legalFirstName) {
            await t.typeText(this.legalFirstName, studentData.legalFirstName, { paste: true })
            log.info("Legal FirstName entered")
        }
        if (studentData.legalMiddleNames) {
            await t.typeText(this.legalMiddleName, studentData.legalMiddleNames, { paste: true })
            log.info("legal MiddleName entered")
        }
        if (studentData.usualLastName) {
            await t.typeText(this.usualLastName, studentData.usualLastName, { paste: true })
            log.info("Usual LastName entered")
        }
        if (studentData.usualFirstName) {
            await t.typeText(this.usualFirstName, studentData.usualFirstName, { paste: true })
            log.info("Usual FirstName entered")
        }
        if (studentData.usualMiddleNames) {
            await t.typeText(this.usualMiddleName, studentData.usualMiddleNames, { paste: true })
            log.info("Usual MiddleName entered")
        }
        if (studentData.maidenName) {
            await t.typeText(this.maidenName, studentData.maidenName, { paste: true })
            log.info("Maiden name entered")
        }
        if (studentData.pastNames) {
            await t.typeText(this.pastName, studentData.pastNames, { paste: true })
            log.info("Past Names entered")
            await t.pressKey("tab")
        }
        if (studentData.dateOfBirth) {
            const month = studentData.dateOfBirth.month
            const day = studentData.dateOfBirth.date
            const year = studentData.dateOfBirth.year
            var y = year.toString()
            // await t
            //     .click(Selector('#birthdate'))
            await t.wait(3000)
            await t.click((Selector('li').withText(y)).filterVisible())
                .click(Selector('div.v-date-picker-table').find('.v-btn__content').nth(month - 1))
                .click(Selector('div.v-date-picker-table').find('.v-btn__content').nth(day - 1))
            log.info("Birthdate entered")
        }
        if (studentData.gender) {
            await t
                .click(Selector('div.v-select__selections'))
            await t.wait(2000)
            await t.click(Selector('div.v-list-item__content').find('.v-list-item__title').nth(studentData.gender))
            await t.wait(2000)
            await t.pressKey("tab")
            log.info("Gender selected")
        }
        if (studentData.email) {
            await t.typeText(this.email, studentData.email, { paste: true })
            log.info("Email ID entered")
        }
        if (studentData.lastBCSchool) {
            await t.typeText(this.lastBCSchool, studentData.lastBCSchool, { paste: true })
            log.info("Last BC School entered")
        }
        if (studentData.lastBCStudentNumber) {
            await t.typeText(this.lastBCStudentNumber, studentData.lastBCStudentNumber, { paste: true })
            log.info("Last BC Student number entered")
        }
        if (studentData.currentSchool) {
            await t.typeText(this.currentSchool, studentData.currentSchool, { paste: true })
            log.info("Current School entered")
        }

        await t.click(Selector('#acceptance_chk', { timeout: 1000 }))
        log.info("Bottom Check box is clicked")

        if (submitBool === true) {
            await t.click(this.submitForm)
            log.info("Submit button is clicked")
            await t.wait(2000)
            await t.expect(await this.submitConfirmation.innerText).eql(studentData.penRequestSubmissionConfirmationText, { timeout: 180000 })
            log.info('Submit confirmation text displayed')

        }

    }

    async bcscFillPenRequestForm(studentData, submitBool) {

        await t.click(this.topCheckBox)
        log.info("Top checkbox is clicked")
        await t
            .wait(5)
            .expect(this.legaLastlName.count).eql(1)

        if (studentData.usualLastName) {
            await t.typeText(this.usualLastName, studentData.usualLastName, { paste: true })
            log.info("Usual LastName entered")
        }
        if (studentData.usualFirstName) {
            await t.typeText(this.usualFirstName, studentData.usualFirstName, { paste: true })
            log.info("Usual FirstName entered")
        }
        if (studentData.usualMiddleNames) {
            await t.typeText(this.usualMiddleName, studentData.usualMiddleNames, { paste: true })
            log.info("Usual MiddleName entered")
        }
        if (studentData.maidenName) {
            await t.typeText(this.maidenName, studentData.maidenName, { paste: true })
            log.info("Maiden name entered")
        }
        if (studentData.pastNames) {
            await t.typeText(this.pastName, studentData.pastNames, { paste: true })
            log.info("Past Names entered")
            await t.pressKey("tab")
        }

        if (studentData.email) {
            await t.typeText(this.email, studentData.email, { replace: true })
            log.info("Email ID entered")
        }
        if (studentData.lastBCSchool) {
            await t.typeText(this.lastBCSchool, studentData.lastBCSchool, { paste: true })
            log.info("Last BC School entered")
        }
        if (studentData.lastBCStudentNumber) {
            await t.typeText(this.lastBCStudentNumber, studentData.lastBCStudentNumber, { paste: true })
            log.info("Last BC Student number entered")
        }
        if (studentData.currentSchool) {
            await t.typeText(this.currentSchool, studentData.currentSchool, { paste: true })
            log.info("Current School entered")
        }

        await t.click(this.bottomCheckBox)
        log.info("Bottom Check box is clicked")

        if (submitBool === true) {
            await t.click(this.submitForm)
            log.info("Submit button is clicked")
            await t.wait(2000)
            await t.expect(await this.submitConfirmation.innerText).eql(studentData.penRequestSubmissionConfirmationText, { timeout: 180000 })
            log.info('Submit confirmation text displayed')

        }

    }
}



export default penRequestForm