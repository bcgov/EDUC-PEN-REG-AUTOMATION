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
        this.birthdate = Selector('#birthdate')
        this.gender = Selector('div.v-select__selections')


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
        this.cancelButton = Selector('#cancelButton')

        //Step 4 related selectors
        this.submitConfirmation = Selector('strong').withText('You are almost')

        //alert content
        this.alert = Selector('v-alert--outlined:nth-child(1) div.v-alert__wrapper > div.v-alert__content')

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

    async waitForEmailElement(){
        await t.expect(this.email.exists).ok()
        log.info("email element visible")
    } 

    async verifyNextButtonDisabled() {
        const element = Selector('#next-step')
        await t.expect(element.hasAttribute('disabled')).ok();
        log.info("Next button is disabled")
    }

    async clickBackButton() {
        await t.wait(3000)
        await t.click(this.backButton)
        log.info("Back button is clicked")
    }

    async clickIDeclareCheckBox() {
        await t.click(Selector('#declarationCheckbox', { timeout: 5000 }))
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

    async setEmail(email, environment) {
        await t.typeText(this.email, email + environment + "@mailsac.com")
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

    async VerifyAlertMessage(data) {
        this.element = Selector('div').withExactText(data)
        await t.expect(this.element.exists).ok()
        log.info("Expected alert message displayed  " + await this.element.innerText)
    }

    async verifyDataRetainedStep1(studentData) {
        await t.expect(await this.legalLastName.value).eql(studentData.legalLastName, { timeout: 15000 })
        await t.expect(await this.legalFirstNmae.value).eql(studentData.legalFirstName)
        await t.expect(await this.birthdate.value).eql(studentData.birthdateUmp)
        await t.expect(await this.gender.innerText).eql(studentData.retainedGenderUmp)
        log.info("Data retained successfully")
    }


    async verifyDataCleared(){
        await t.expect(await this.legalLastName.value).eql('', { timeout: 15000 })
        await t.expect(await this.legalFirstNmae.value).eql('')
        await t.expect(await this.birthdate.value).eql('')
        await t.expect(await this.gender.innerText).eql('')
        log.info("Data cleared successfully")
    }


    async clickEditMiddleNameCheckbox() {
        await t.click(this.middleNameEditCheckBox)
        log.info("Edit legal middle name checkbox clicked")
    }

    async setLegalMiddleNameStep2(studentData) {
        await t.typeText(this.middleNameTextBox, studentData.legalMiddleNames)
        log.info("legal middlename set")
    }

    async verifyNamesOnSummaryPage(studentData) {
        const element = Selector('div.row.no-gutters:nth-child(3) > div.col-sm-8.col-md-9.col-lg-9.col-xl-9.col')
        await t.expect(element.innerText).eql(studentData.legalFirstName + " " + studentData.legalMiddleNames + " " + studentData.legalLastName)
        log.info("names verified on summary page")

    }

    async verifyBirthdateOnSummaryPage(studentData) {
        const element = Selector('div.row.no-gutters:nth-child(4) > div.col-sm-8.col-md-9.col-lg-9.col-xl-9.col')
        await t.expect(element.innerText).eql(studentData.birthdateUmp)
        log.info("birthdate verified on summary page")

    }

    async verifyGenderOnSummaryPage(data) {
        const element = Selector('div.row.no-gutters:nth-child(5) > div.col-sm-8.col-md-9.col-lg-9.col-xl-9.col')
        await t.expect(element.innerText).eql(data)
        log.info("gender verified on summary page")

    }


    async verifyEmailOnSummaryPage(email, environment) {
        const element = Selector('div.row.no-gutters:nth-child(7) > div.col-sm-8.col-md-9.col-lg-9.col-xl-9.col')
        await t.expect(element.innerText).eql(email + environment + "@mailsac.com")
        log.info("email verified on summary page")

    }

    async setGenderStep2(data){
        await t
            .click(Selector('div.v-select__selections'));
        await t.wait(2000)
        await t.click(Selector('div.v-list-item__content').find('.v-list-item__title').nth(data))
        await t.wait(2000)
        await t.pressKey("tab");
        log.info("Gender selected")
    }

    async clickCancelButton(){
        await t.click(this.cancelButton)
        log.info("Cancel button clicked")
    }




}
export default updateMyPenInfoPage