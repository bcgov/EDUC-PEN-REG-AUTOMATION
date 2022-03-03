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
        this.nextButton = Selector('#next-step')
        this.backButton = Selector('#previous-step')
        this.comfirmGmpSubmitText = Selector('div.container.pt-0.px-1.container--fluid div.row.no-gutters:nth-child(1) p:nth-child(1) > strong:nth-child(1)')
        this.cancelButton = Selector('#cancelButton')
        this.gender = Selector('div.v-select__selections')
        this.birthdate = Selector('#birthdate')
    }

    async fillRequestForm(studentData, submitBool, environment) {

        await t.click(Selector('input:nth-of-type(1)', { timeout: 5000 }))
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
        // if (studentData.gender) {
        //     await t
        //         .click(Selector('div.v-select__selections'))
        //     await t.wait(2000)
        //     await t.click(Selector('div.v-list-item__content').find('.v-list-item__title').nth(studentData.gender))
        //     await t.wait(2000)
        //     await t.pressKey("tab")
        //     log.info("Gender selected")
        // }
        if (studentData.email) {
            await t.typeText(this.email, studentData.email + environment + "@mailsac.com", { paste: true })
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
            await t.click(this.nextButton)
            log.info("Clicked on next button")
            await t.wait(2000)
            await t.expect(await this.submitConfirmation.innerText).eql(studentData.penRequestSubmissionConfirmationText, { timeout: 180000 })
            log.info('Submit confirmation text displayed')

        }

    }

    async bcscFillPenRequestForm(studentData, submitBool, environment) {

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
            await t.typeText(this.email, studentData.email + environment + "@mailsac.com", { replace: true })
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
            await t.click(this.nextButton)
            log.info("Clicked on next button")
            await t.wait(2000)
            await t.expect(await this.submitConfirmation.innerText).eql(studentData.penRequestSubmissionConfirmationText, { timeout: 180000 })
            log.info('Submit confirmation text displayed')
        }
    }

    async clickCheckBoxOne() {
        await t.click(this.topCheckBox)
        log.info("Top checkbox is clicked")
        await t.expect(this.legaLastlName.count).eql(1)
    }

    async clickCheckBoxTwo() {
        await t.click(this.bottomCheckBox)
        log.info("Bottom Check box is clicked")
    }

    async setLegalLastName(studentData) {
        await t.typeText(this.legaLastlName, studentData.legalLastName, { paste: true })
        log.info("Legal LastName entered")
    }

    async verifyNextButtonDisabled() {
        await t.expect(this.submitForm.hasAttribute('disabled')).ok();
        log.info("Next button is disabled")
    }

    async verifyNextButtonEnabled() {
        await t.expect(this.submitForm.hasAttribute('disabled')).notOk();
        log.info("Next button is enabled")
    }

    async setPastname(studentData) {
        await t.typeText(this.pastName, studentData.pastNames, { paste: true })
        log.info("Past Names entered")
        await t.pressKey("tab")
    }

    async setDob(studentData) {
        const month = studentData.dateOfBirth.month
        const day = studentData.dateOfBirth.date
        const year = studentData.dateOfBirth.year
        var y = year.toString()
        await t.wait(3000)
        await t.click((Selector('li').withText(y)).filterVisible())
            .click(Selector('div.v-date-picker-table').find('.v-btn__content').nth(month - 1))
            .click(Selector('div.v-date-picker-table').find('.v-btn__content').nth(day - 1))
        log.info("Birthdate set")
    }

    async selectGender(studentData) {
        await t
            .click(Selector('div.v-select__selections'))
        await t.wait(2000)
        await t.click(Selector('div.v-list-item__content').find('.v-list-item__title').nth(studentData.gender))
        await t.wait(2000)
        await t.pressKey("tab")
        log.info("Gender selected")
    }

    async setEmail(studentData, environment) {
        await t.typeText(this.email, studentData.email + environment + "@mailsac.com", { paste: true })
        log.info("Email ID entered")
    }

    async clickNextButton() {
        await t.click(this.submitForm)
        log.info("Next button clicked")
    }

    async verifyConfirmGmpSubmitText(studentData) {
        await t.expect(await this.comfirmGmpSubmitText.innerText).eql(studentData.comfirmGmpSubmitText, { timeout: 15000 })
        log.info('Expected text displayed')
    }

    async clickBackButton() {
        await t.click(this.backButton)
        log.info("Back button cliked")
    }

    async verifyDataRetained(studentData, environment) {
        await t.expect(await this.legaLastlName.value).eql(studentData.legalLastName, { timeout: 15000 })
        await t.expect(await this.pastName.value).eql(studentData.pastNames)
        await t.expect(await this.email.value).eql(studentData.email + environment + "@mailsac.com")
        await t.expect(await this.birthdate.value).eql(studentData.birthdateGmp)
        //await t.expect(await this.gender.innerText).eql(studentData.retainedGenderGmp)
        log.info("Data retained successfully")
    }

    async verifyDataCleared() {
        await t.expect(await this.legaLastlName.value).eql('', { timeout: 15000 })
        await t.expect(await this.pastName.value).eql('')
        await t.expect(await this.email.value).eql('')
        await t.expect(await this.birthdate.value).eql('')
        //await t.expect(await this.gender.innerText).eql('')
        log.info("Data cleared successfully")
    }

    async clearLegalLastName() {
        await t
            .click(this.legaLastlName)
            .pressKey('ctrl+a delete')
        log.info("legal lastname input cleared")
    }

    async clearLegalFirstName() {
        await t
            .click(this.legalFirstName)
            .pressKey('ctrl+a delete')
        log.info("legal First name input cleared")
    }

    async setLegalFirstName(studentData) {
        await t.typeText(this.legalFirstName, studentData.legalFirstName, { paste: true })
        log.info("Legal FirstName entered")
    }

    async clickCancelButton() {
        await t.click(this.cancelButton)
        log.info("cancel button clicked")
    }

}
export default penRequestForm