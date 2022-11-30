import { Selector, t } from 'testcafe'
const log = require('npmlog')

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

    async verifySchoolDetails() {

        await this.verifySchoolMincodeName('99999999', 'Automation Testing School');
        await this.verifyOpenDate('2022/01/01');
        await this.verifyFacilityType('Standard');
        await this.verifySchoolCategory('Public');
        await this.verifyOrganization('Two Semesters');

    }

    async verifySchoolMincodeName(mincode, displayName) {
        let mincode_name = mincode + ' - '+ displayName;
        await t.expect(this.schoolMCName.innerText).contains(mincode_name);
        log.info("School Mincode and Name Verified");
    }

    async verifyOpenDate(openDate) {
        await t.expect(this.schoolOpenDate.withText(openDate).innerText).contains(openDate);
        log.info("School Open Date Verified");
    }

    async verifyFacilityType(typeCode) {
        await t.expect(this.schoolFacilityType.withText(typeCode).innerText).contains(typeCode);
        log.info("School Facility Type Verified");
    }

    async verifySchoolCategory(categoryCode) {
        await t.expect(this.schoolCategory.withText(categoryCode).innerText).contains(categoryCode);
        log.info("School Category Verified");
    }

    async verifyGradesOffered(grades) {
        await t.expect(this.schoolGradesOffered.withText(grades).innerText).contains(grades);
        log.info("School Grades Offered Verified");
    }

    async verifyOrganization(organizationCode) {
        await t.expect(this.schoolOrganization.withText(organizationCode).innerText).contains(organizationCode);
        log.info("School Organization Verified");
    }

    async verifyMailingAddress(addresses) {
        await t.expect(this.schoolMailingAddress.withText(addresses).innerText).contains(addresses);
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