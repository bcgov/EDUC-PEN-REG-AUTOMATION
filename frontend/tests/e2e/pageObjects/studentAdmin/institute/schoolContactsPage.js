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

        this.contactEditEmail = Selector('#contactEditEmail');
        this.contactEditPhoneNumber = Selector('#contactEditPhoneNumber');
        this.contactEditPhoneExt = Selector('#contactEditPhoneExt');
        this.contactEditAltPhoneNumber = Selector('#contactEditAltPhoneNumber');
        this.contactEditAltPhoneExt = Selector('#contactEditAltPhoneExt');
        this.contactEditStartDate = Selector('#contactEditStartDate');

    }

    async clickEditContactButton(){
        await t.click(this.editContactButton);
        log.info("Edit School Contact Button Clicked");
    }

    async editSchoolContact(){
        await t.typeText(this.contactEditEmail, 'thawk@test.com', { replace: true });
        await t.typeText(this.contactEditPhoneNumber, '2501234564', { replace: true });
        await t.typeText(this.contactEditPhoneExt, '888', { replace: true });
        await t.typeText(this.contactEditAltPhoneNumber, '2508854578', { replace: true });
        await t.typeText(this.contactEditAltPhoneExt, '999', { replace: true });
        await t.typeText(this.contactEditStartDate, '2022/01/01', { replace: true });

        await t.click(this.saveContactButton);
        log.info("School Contact Edit Complete");
    }

    async verifySchoolContactDetails(schoolPrincipalDetails) {

        let principalFullName = schoolPrincipalDetails.firstName + ' ' + schoolPrincipalDetails.lastName;
        await this.verifyContactName(principalFullName);
        await this.verifyContactEmail(schoolPrincipalDetails.email);
        await this.verifyContactPhoneNum(schoolPrincipalDetails.phoneNumber);
        if (schoolPrincipalDetails.phoneExtension !== null && schoolPrincipalDetails.phoneExtension !== '') {
            await this.verifyContactPhoneNumExt(schoolPrincipalDetails.phoneExtension);
        }
        if (schoolPrincipalDetails.alternatePhoneNumber !== null && schoolPrincipalDetails.alternatePhoneNumber !== '') {
            await this.verifyContactAltPhoneNum(schoolPrincipalDetails.alternatePhoneNumber);
        }
        if (schoolPrincipalDetails.alternatePhoneExtension !== null && schoolPrincipalDetails.alternatePhoneExtension !== '') {
            await this.verifyContactAltPhoneNumExt(schoolPrincipalDetails.alternatePhoneExtension);
        }
        await this.verifyContactStartDate(schoolPrincipalDetails.effectiveDate);

    }
    async verifyContactName(name){
        await t.expect(this.principalContactName.withText(name).innerText).contains(name);
        log.info("Contact Name Verified");
    }
    async verifyContactEmail(email){
        await t.expect(this.principalContactEmail.withText(email).innerText).contains(email);
        log.info("Contact Email Verified");
    }
    async verifyContactPhoneNum(phoneNumber){
        phoneNumber = phoneNumber.slice(0,3)+"-"+phoneNumber.slice(3,6)+"-"+phoneNumber.slice(6);
        await t.expect(this.principalContactPhoneNumber.withText(phoneNumber).innerText).contains(phoneNumber);
        log.info("Contact Phone Number Verified");
    }
    async verifyContactPhoneNumExt(phoneNumberExt){
        phoneNumberExt = 'ext. ' + phoneNumberExt;
        await t.expect(this.principalContactPhoneNumberExt.withText(phoneNumberExt).innerText).contains(phoneNumberExt);
        log.info("Contact Phone Number Extension Verified");
    }
    async verifyContactAltPhoneNum(altPhoneNumber){
        altPhoneNumber = altPhoneNumber.slice(0,3)+"-"+altPhoneNumber.slice(3,6)+"-"+altPhoneNumber.slice(6)+" (alt.)";
        await t.expect(this.principalContactAltPhoneNumber.withText(altPhoneNumber).innerText).contains(altPhoneNumber);
        log.info("Contact Alternate Phone Number Verified");
    }
    async verifyContactAltPhoneNumExt(altPhoneNumberExt){
        altPhoneNumberExt = 'ext. ' + altPhoneNumberExt;
        await t.expect(this.principalContactAltPhoneNumberExt.withText(altPhoneNumberExt).innerText).contains(altPhoneNumberExt);
        log.info("Contact Alternate Phone Number Extension Verified");
    }
    async verifyContactStartDate(startDate){
        let parsedStartDate = new LocalDateTime.parse(startDate, DateTimeFormatter.ofPattern('uuuu-MM-dd\'T\'HH:mm:ss'));
        let startDateString = parsedStartDate.format(DateTimeFormatter.ofPattern('uuuu/MM/dd'));
        await t.expect(this.principalContactStartDate.withText(startDateString).innerText).contains(startDateString);
        log.info("Contact Start Date Verified");
    }

}

export default SchoolDetailsPage