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
        this.saveContactButton = Selector('#saveEditButton');

        this.contactFirstName = Selector('#contactEditFirstName');
        this.contactLastName = Selector('#contactEditLastName');
        this.contactEditEmail = Selector('#contactEditEmail');
        this.contactEditPhoneNumber = Selector('#contactEditPhoneNumber');
        this.contactEditPhoneExt = Selector('#contactEditPhoneExt');
        this.contactEditAltPhoneNumber = Selector('#contactEditAltPhoneNumber');
        this.contactEditAltPhoneExt = Selector('#contactEditAltPhoneExt');
        this.contactEditStartDate = Selector('#editContactEffectiveDateTextField');
        this.datePickerClickOne = Selector('.v-date-picker-header__value').child('div').child('button');
        this.datePickerYear = Selector('.v-date-picker-years').find('li').withText('2022');
        this.datePickerMonth = Selector('div').child('.v-date-picker-table').find('.v-btn__content').withText('JAN');
        this.datePickerDay = Selector('div').child('.v-date-picker-table').find('.v-btn__content').withText('1');
    }

    async clickEditContactButton(){
        await t.click(this.editContactButton);
        log.info("Edit School Contact Button Clicked");
    }

    async editSchoolContact(){
        await t.typeText(this.contactFirstName, 'Tony', { replace: true });
        await t.typeText(this.contactLastName, 'Hawk', { replace: true });
        await t.typeText(this.contactEditEmail, 'thawk@test.com', { replace: true });
        await t.typeText(this.contactEditPhoneNumber, '2501234564', { replace: true });
        await t.typeText(this.contactEditPhoneExt, '888', { replace: true });
        await t.typeText(this.contactEditAltPhoneNumber, '2508854578', { replace: true });
        await t.typeText(this.contactEditAltPhoneExt, '999', { replace: true });

        await this.selectStartDate();

        await t.click(this.saveContactButton);
        log.info("School Contact Edit Complete");
    }

    async selectStartDate() {
        await t.click(this.contactEditStartDate);

        await t.click(this.datePickerClickOne()).wait(1000);
        await t.click(this.datePickerClickOne()).wait(1000);
        await t.click(this.datePickerYear()).wait(1000);
        await t.click(this.datePickerMonth());
        await t.click(this.datePickerDay());

        log.info("Contact start date selected")
    }

    async verifySchoolContactDetails() {

        await this.verifyContactName();
        await this.verifyContactEmail();
        await this.verifyContactPhoneNum();
        await this.verifyContactPhoneNumExt();
        await this.verifyContactAltPhoneNum();
        await this.verifyContactAltPhoneNumExt();
        await this.verifyContactStartDate();
        log.info('Contact Verification Complete');
    }
    async verifyContactName(name){
        await t.expect(this.principalContactName.withText('Tony Hawk').innerText).contains('Tony Hawk');
        log.info("Contact Name Verified");
    }
    async verifyContactEmail(){
        await t.expect(this.principalContactEmail.withText('thawk@test.com').innerText).contains('thawk@test.com');
        log.info("Contact Email Verified");
    }
    async verifyContactPhoneNum(){
        await t.expect(this.principalContactPhoneNumber.withText('250-123-4564').innerText).contains('250-123-4564');
        log.info("Contact Phone Number Verified");
    }
    async verifyContactPhoneNumExt(){
        await t.expect(this.principalContactPhoneNumberExt.withText('888').innerText).contains('888');
        log.info("Contact Phone Number Extension Verified");
    }
    async verifyContactAltPhoneNum(){
        await t.expect(this.principalContactAltPhoneNumber.withText('250-885-4578').innerText).contains('250-885-4578');
        log.info("Contact Alternate Phone Number Verified");
    }
    async verifyContactAltPhoneNumExt(){
        await t.expect(this.principalContactAltPhoneNumberExt.withText('999').innerText).contains('999');
        log.info("Contact Alternate Phone Number Extension Verified");
    }
    async verifyContactStartDate(){
        await t.expect(this.principalContactStartDate.withText('2022/01/01').innerText).contains('2022/01/01');
        log.info("Contact Start Date Verified");
    }

}

export default SchoolDetailsPage