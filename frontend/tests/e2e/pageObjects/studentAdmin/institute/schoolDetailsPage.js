import { Selector, t } from 'testcafe'
const log = require('npmlog')
import {DateTimeFormatter, LocalDateTime} from '@js-joda/core';
const {getSchoolDetails,getFacilityTypeDisplayValue,getSchoolCategoryDisplayValue,getSchoolGradeListFormatted,getSchoolOrganizationDisplayValue,getSchoolMailingAddress} = require('../../../helpers/schoolUtils');

class SchoolDetailsPage {
    constructor() {

        this.schoolMCName = Selector('.subjectHeading');
        this.schoolOpenDate = Selector('span');
        this.schoolFacilityType = Selector('span');
        this.schoolCategory = Selector('span');
        this.schoolGradesOffered = Selector('span');
        this.schoolOrganization = Selector('span');
        this.schoolMailingAddress = Selector('span');

        this.schoolNotesTimeline = Selector("#schoolNotesTimeline");

        this.addNewNoteButton = Selector('#addNewNoteButton');
        this.newNoteSheet = Selector('#newNoteSheet');
        this.newNoteTextArea = Selector('#newNoteTextArea');
        this.cancelNewNoteButton = Selector('#cancelNote');
        this.saveNewNoteButton = Selector('#saveNote');
    }

    async verifySchoolDetails(schoolNumber) {

        let schoolDetails = await getSchoolDetails(schoolNumber);

        await this.verifySchoolMincodeName(schoolDetails.mincode, schoolDetails.displayName);
        await this.verifyOpenDate(schoolDetails.openedDate);
        await this.verifyFacilityType(schoolDetails.facilityTypeCode);
        await this.verifySchoolCategory(schoolDetails.schoolCategoryCode);
        await this.verifyGradesOffered(schoolDetails.grades);
        await this.verifyOrganization(schoolDetails.schoolOrganizationCode);
        await this.verifyMailingAddress(schoolDetails.addresses);

    }

    async verifySchoolMincodeName(mincode, displayName) {
        let mincode_name = mincode + ' - '+ displayName;
        await t.expect(this.schoolMCName.innerText).contains(mincode_name);
        log.info("School Mincode and Name Verified");
    }

    async verifyOpenDate(openDate) {
        let parsedOpenDate = new LocalDateTime.parse(openDate, DateTimeFormatter.ofPattern('uuuu-MM-dd\'T\'HH:mm:ss'));
        let openDateString = parsedOpenDate.format(DateTimeFormatter.ofPattern('uuuu/MM/dd'));
        await t.expect(this.schoolOpenDate.withText(openDateString).innerText).contains(openDateString);
        log.info("School Open Date Verified");
    }

    async verifyFacilityType(typeCode) {
        let facilityTypeDisplayValue = await getFacilityTypeDisplayValue(typeCode);
        await t.expect(this.schoolFacilityType.withText(facilityTypeDisplayValue).innerText).contains(facilityTypeDisplayValue);
        log.info("School Facility Type Verified");
    }

    async verifySchoolCategory(categoryCode) {
        let categoryCodeDisplayValue = await getSchoolCategoryDisplayValue(categoryCode);
        await t.expect(this.schoolCategory.withText(categoryCodeDisplayValue).innerText).contains(categoryCodeDisplayValue);
        log.info("School Category Verified");
    }

    async verifyGradesOffered(grades) {
        let formattedGradeList = await getSchoolGradeListFormatted(grades);
        await t.expect(this.schoolGradesOffered.withText(formattedGradeList).innerText).contains(formattedGradeList);
        log.info("School Grades Offered Verified");
    }

    async verifyOrganization(organizationCode) {
        let organizationDisplayValue = await getSchoolOrganizationDisplayValue(organizationCode);
        await t.expect(this.schoolOrganization.withText(organizationDisplayValue).innerText).contains(organizationDisplayValue);
        log.info("School Organization Verified");
    }

    async verifyMailingAddress(addresses) {
        let schoolMailingAddress = await getSchoolMailingAddress(addresses);
        let addressLine2 = schoolMailingAddress.city +', '+ schoolMailingAddress.provinceCode + ', ' + schoolMailingAddress.countryCode;

        await t.expect(this.schoolMailingAddress.withText(schoolMailingAddress.addressLine1).innerText).contains(schoolMailingAddress.addressLine1);
        await t.expect(this.schoolMailingAddress.withText(addressLine2).innerText).contains(addressLine2);
        await t.expect(this.schoolMailingAddress.withText(schoolMailingAddress.postal).innerText).contains(schoolMailingAddress.postal);
        log.info("School Mailing Address Verified");
    }

    async verifySchoolNotesTimelineExists() {
        await t.expect(this.schoolNotesTimeline.exists).ok();
        log.info("Verified School Notes Timeline exists.");
    }

    async verifySchoolNotesTimelineContainsItemWithText(textToVerify) {
        await t.expect(this.schoolNotesTimeline.find('.v-card__text.activityContent').withText(textToVerify).exists).ok();
        log.info("Verified that the specified text was found as an item within the School Notes Timeline.");
    }

    async verifyAddNewNoteButtonExists() {
        await t.expect(this.addNewNoteButton.exists).ok();
        log.info("Verified Add New Note Button exists.");
    }

    async verifyAddNewNoteButtonEnabled() {
        await t.expect(this.addNewNoteButton.hasAttribute('disabled')).notOk();
        log.info("Verified Add New Note Button is enabled.");
    }

    async verifyAddNewNoteButtonDisabled() {
        await t.expect(this.addNewNoteButton.hasAttribute('disabled')).ok();
        log.info("Verified Add New Note Button is disabled.");
    }

    async clickAddNewNoteButton() {
        await t.click(this.addNewNoteButton);
        log.info('Add New Note Button clicked.')
    }

    async verifyNewNoteSheetExists() {
        await t.expect(this.newNoteSheet.exists).ok();
        log.info("Verified New Note Sheet exists.");
    }

    async verifyNewNoteSheetDoesNotExist() {
        await t.expect(this.newNoteSheet.exists).notOk();
        log.info("Verified New Note Sheet does not exist.");
    }

    async verifyNewNoteTextAreaExists() {
        await t.expect(this.newNoteTextArea.exists).ok();
        log.info("Verified New Note Text Area exists.");
    }

    async setNewNoteTextAreaText(value) {
        await t.typeText(this.newNoteTextArea, value);
        log.info('Typed text into the New Note Text Area.');
    }

    async verifyNewNoteTextAreaText(value) {
        await t.expect(this.newNoteTextArea.innerText).eql(value);
        log.info('Verified New Note Text Area text value.');
    }

    async verifyCancelNewNoteButtonExists() {
        await t.expect(this.cancelNewNoteButton.exists).ok();
        log.info("Verified Cancel New Note Button exists.");
    }

    async verifyCancelNewNoteButtonEnabled() {
        await t.expect(this.cancelNewNoteButton.hasAttribute('disabled')).notOk();
        log.info("Verified Cancel New Note Button is enabled.");
    }

    async verifyCancelNewNoteButtonDisabled() {
        await t.expect(this.cancelNewNoteButton.hasAttribute('disabled')).ok();
        log.info("Verified Cancel New Note Button is disabled.");
    }

    async clickCancelNewNoteButton() {
        await t.click(this.cancelNewNoteButton);
        log.info("Cancel New Note Button clicked.");
    }

    async verifySaveNewNoteButtonExists() {
        await t.expect(this.saveNewNoteButton.exists).ok();
        log.info("Verified Save New Note Button exists.");
    }

    async verifySaveNewNoteButtonEnabled() {
        await t.expect(this.saveNewNoteButton.hasAttribute('disabled')).notOk();
        log.info("Verified Save New Note Button is enabled.");
    }

    async verifySaveNewNoteButtonDisabled() {
        await t.expect(this.saveNewNoteButton.hasAttribute('disabled')).ok();
        log.info("Verified Save New Note Button is disabled.");
    }

    async clickSaveNewNoteButton() {
        await t.click(this.saveNewNoteButton);
        log.info("Save New Note Button clicked.");
    }

}

export default SchoolDetailsPage