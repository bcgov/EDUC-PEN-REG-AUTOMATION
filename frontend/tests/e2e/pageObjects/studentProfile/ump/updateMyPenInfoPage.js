import { Selector, t } from 'testcafe'
const log = require('npmlog')


class updateMyPenInfoPage {

    constructor() {

        //step 1 of completed pen request related Selectors
        this.informationText = Selector('div.v-card__subtitle > span:nth-child(1)')

        // Step 1 related selectors
        this.penNumber = Selector('#recordedPen')
        this.legalFirstNmae = Selector('#recordedLegalFirstName')
        this.legalMiddleName = Selector('#recordedLegalMiddleNames')
        this.legalLastName = Selector('#recordedLegalLastName')


        //navigtion buttons
        this.backButton = Selector('#previous-step')
        this.nextButton = Selector('span').withExactText('Next').filterVisible()
        this.submitButton = Selector('span').withExactText('Submit').filterVisible()

        //Step 2 related selectors
        this.topCheckBox = Selector('#declarationCheckbox')
        this.firstNameEditCheckBox = Selector('#editLegalFirstNameCheckbox')
        this.firstNameTextBox = Selector("#legalFirstName")
        this.lastNameEditCheckBox = Selector('#editLegalLastNameCheckbox')
        this.lastNameTextBox = Selector("#legalLastName")
        this.middleNameEditCheckBox = Selector('#editLegalMiddleNamesCheckbox')
        this.middleNameTextBox = Selector("#legalMiddleNames")
        this.birthDateEditCheckBox = Selector('#editBirthdateCheckbox')
        this.genderEditCheckBox = Selector('#editGenderLabelCheckbox')
        this.email = Selector('#email')
        this.bottomCheckBox = Selector('#acceptance_chk')

        //Step 4 related selectors
        this.submitConfirmation = Selector('strong').withText('You are almost')


    }

    async setPenNumber(data) {
        await t.typeText(this.penNumber, data, { paste: true })
        log.info("pen number entered")
    }

    async setLegalFirstName(data) {
        await t.typeText(this.legalFirstNmae, data, { paste: true })
        log.info("Legal FirstName entered")
    }

    async setLegalMiddleName(data) {
        await t.typeText(this.legalMiddleName, data, { paste: true })
        log.info("legal MiddleName entered")
    }

    async setLegalLastName(data) {
        await t.typeText(this.legalLastName, data, { paste: true })
        await t.pressKey("tab")
        log.info("Legal LastName entered")
    }

    async setBirthDate(studentData) {
        const month = studentData.dateOfBirth.month
        const day = studentData.dateOfBirth.date
        const year = studentData.dateOfBirth.year
        var y = year.toString();
        await t.wait(3000)
        await t.click((Selector('li').withText(y)).filterVisible())
            .click(Selector('div.v-date-picker-table').find('.v-btn__content').nth(month - 1))
            .click(Selector('div.v-date-picker-table').find('.v-btn__content').nth(day - 1));
        log.info("Birthdate entered")
    }

    async setGender(studentData) {
        await t
            .click(Selector('div.v-select__selections'));
        await t.wait(2000)
        await t.click(Selector('div.v-list-item__content').find('.v-list-item__title').nth(studentData.updatedGender))
        await t.wait(2000)
        await t.pressKey("tab");
        log.info("Gender selected")
    }

    async clickNextButton() {
        await t.wait(2000)
        await t.click(this.nextButton)
        log.info("Next button is clicked")
    }

    async clickBackButton() {
        await t.click(this.backButton)
        log.info("Back button is clicked")
    }

    async clickIDeclareCheckBox() {
        await t.click(Selector('#declarationCheckbox', { timeout: 1000 }))
        log.info("I declare check box is clicked")
    }

    async editFirstName(data) {
        await t.click(Selector('#editLegalFirstNameCheckbox', { timeout: 1000 }))
        await t.typeText(this.firstNameTextBox, data)
        log.info("First name is set")
    }

    async clickeditGenderCheckbox() {
        await t.click(Selector('#editGenderLabelCheckbox', { timeout: 1000 }))
        log.info("edit gender checkbox is clicked")
    }

    async setEmail(data) {
        await t.typeText(this.email, data)
        log.info("Email is set")
    }

    async clickAccurateCheckBox() {
        await t.click(Selector('#acceptance_chk', { timeout: 1000 }))
        log.info("provided info is accurate check box is clicked")
    }

    async clickSubmitButton() {
        await t.click(this.submitButton)
        log.info("Submit button is clicked")
    }

    async assertBelowInfoText() {
        await t.expect(this.informationText.innerText).eql('Below is your current information as it appears in your school record', { timeout: 10000 })
    }

    async assertEnterInfoText() {
        await t.expect(this.informationText.innerText).eql('Enter current information as it appears on your highschool transcript or school record', { timeout: 10000 })
    }

    async submitConfirmationDisplayed(data) {
        await t.expect(this.submitConfirmation.innerText).eql(data, { timeout: 10000 })
        log.info('Submit confirmation text displayed')
    }


}
export default updateMyPenInfoPage