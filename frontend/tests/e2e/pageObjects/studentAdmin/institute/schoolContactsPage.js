import { Selector, t } from 'testcafe'
const log = require('npmlog')
import {DateTimeFormatter, LocalDateTime} from '@js-joda/core';

class SchoolDetailsPage {
    constructor() {

        this.principalContactName = Selector('strong');
        this.principalContactEmail = Selector('span');
        this.principalContactPhoneNumber = Selector('span');
        this.principalContactPhoneNumberExt = Selector('span');
        this.principalContactAltPhoneNumber = Selector('span');
        this.principalContactAltPhoneNumberExt = Selector('span');
        this.principalContactStartDate = Selector('span');
        this.editContactButton = Selector('#editContactButton');
        this.saveChangesToSchoolContactButton = Selector('#saveChangesToSchoolContactButton');

        this.editSchoolContactCard = Selector('#editSchoolContactCard');
        this.editSchoolContactFirstNameInput = Selector('#editSchoolContactFirstNameInput');
        this.editSchoolContactLastNameInput = Selector('#editSchoolContactLastNameInput');
        this.editSchoolContactEmailInput = Selector('#editSchoolContactEmailInput');
        this.editSchoolContactPhoneNumberInput = Selector('#editSchoolContactPhoneNumberInput');
        this.editSchoolContactPhoneExtensionInput = Selector('#editSchoolContactPhoneExtensionInput');
        this.editSchoolContactAltPhoneNumberInput = Selector('#editSchoolContactAltPhoneNumberInput');
        this.editSchoolContactAltPhoneExtensionInput = Selector('#editSchoolContactAltPhoneExtensionInput');
        this.editSchoolContactEffectiveDateTextField = Selector('#editSchoolContactEffectiveDateTextField');
        this.datePickerClickOne = Selector('.v-date-picker-header__value').child('div').child('button');
        this.datePickerYear = Selector('.v-date-picker-years').find('li').withText('2022');
        this.datePickerMonth = Selector('div').child('.v-date-picker-table').find('.v-btn__content').withText('JAN');
        this.datePickerDay = Selector('div').child('.v-date-picker-table').find('.v-btn__content').withText('1');
    }

    async clickEditContactButton(){
        await t.click(this.editContactButton);
        log.info("Edit School Contact Button Clicked");
    }

    async verifyEditSchoolContactCardExists() {
        await t.expect(this.editSchoolContactCard.exists).ok();
        log.info('Verified editSchoolContactCard exists.');
    }

    async verifyEditSchoolContactCardDoesNotExist() {
        await t.expect(this.editSchoolContactCard.exists).notOk();
        log.info('Verified editSchoolContactCard does not exist.');
    }

    async editSchoolContact(){
        await t.typeText(this.editSchoolContactFirstNameInput, 'Tony', { replace: true });
        await t.typeText(this.editSchoolContactLastNameInput, 'Hawk', { replace: true });
        await t.typeText(this.editSchoolContactEmailInput, 'thawk@test.com', { replace: true });
        await t.typeText(this.editSchoolContactPhoneNumberInput, '2501234564', { replace: true });
        await t.typeText(this.editSchoolContactPhoneExtensionInput, '888', { replace: true });
        await t.typeText(this.editSchoolContactAltPhoneNumberInput, '2508854578', { replace: true });
        await t.typeText(this.editSchoolContactAltPhoneExtensionInput, '999', { replace: true });

        await this.selectStartDate();

        await t.click(this.saveChangesToSchoolContactButton);
        log.info("School Contact Edit Complete");
    }

    async selectStartDate() {
        await t.click(this.editSchoolContactEffectiveDateTextField);

        await t.click(this.datePickerClickOne()).wait(1000);
        await t.click(this.datePickerClickOne()).wait(1000);
        await t.click(this.datePickerYear()).wait(1000);
        await t.click(this.datePickerMonth());
        await t.click(this.datePickerDay());

        log.info("Contact start date selected")
    }

    async verifySchoolContactDetails() {
        await this.verifyContactName('Tony Hawk');
        await this.verifyContactEmail('thawk@test.com');
        await this.verifyContactPhoneNum('250-123-4564');
        await this.verifyContactPhoneNumExt('888');
        await this.verifyContactAltPhoneNum('250-885-4578');
        await this.verifyContactAltPhoneNumExt('999');
        await this.verifyContactStartDate('2022/01/01');
        log.info('Contact Verification Complete');
    }

    async verifyContactName(name){
        await t.expect(this.principalContactName.withText(name).innerText).contains(name);
        log.info(`Contact Name ${name} Verified`);
    }
    async verifyContactEmail(email){
        await t.expect(this.principalContactEmail.withText(email).innerText).contains(email);
        log.info(`Contact Email ${email} Verified`);
    }
    async verifyContactPhoneNum(phoneNumber){
        await t.expect(this.principalContactPhoneNumber.withText(phoneNumber).innerText).contains(phoneNumber);
        log.info(`Contact Phone Number ${phoneNumber} Verified`);
    }
    async verifyContactPhoneNumExt(phoneNumberExt){
        await t.expect(this.principalContactPhoneNumberExt.withText(phoneNumberExt).innerText).contains(phoneNumberExt);
        log.info(`Contact Phone Number Extension ${phoneNumberExt} Verified`);
    }
    async verifyContactAltPhoneNum(altPhoneNumber){
        await t.expect(this.principalContactAltPhoneNumber.withText(altPhoneNumber).innerText).contains(altPhoneNumber);
        log.info(`Contact Alternate Phone Number ${altPhoneNumber} Verified`);
    }
    async verifyContactAltPhoneNumExt(altPhoneNumberExt){
        await t.expect(this.principalContactAltPhoneNumberExt.withText(altPhoneNumberExt).innerText).contains(altPhoneNumberExt);
        log.info(`Contact Alternate Phone Number Extension ${altPhoneNumberExt} Verified`);
    }
    async verifyContactStartDate(startDate){
        await t.expect(this.principalContactStartDate.withText(startDate).innerText).contains(startDate);
        log.info(`Contact Start Date ${startDate} Verified`);
    }

}

export default SchoolDetailsPage