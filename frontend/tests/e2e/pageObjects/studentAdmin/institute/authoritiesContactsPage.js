import { Selector, t } from 'testcafe'
const log = require('npmlog')

class AuthoritiesContactsPage {
  constructor() {
    this.authorityNameField = Selector('#authorityNameAndNumber');
    this.authorityTypeLabel = Selector('#authorityTypeLabel');
    this.authorityContactName = Selector('#authorityContactName');

    this.authorityContactName = Selector('strong');//TODO
    this.authorityContactEmail = Selector('span');
    this.authorityContactPhoneNumber = Selector('span');
    this.authorityContactPhoneNumberExt = Selector('span');
    this.authorityContactAltPhoneNumber = Selector('span');
    this.authorityContactAltPhoneNumberExt = Selector('span');
    this.authorityContactStartDate = Selector('span');

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

  async verifyAuthorityNumberAndName(name) {
    await t.expect(this.authorityNameField.withText(name).count).eql(1, {timeout: 3000});
    log.info('Authority detail name and number verified');
  }

  async verifyAuthorityTypeLabel() {
    await t.expect(this.authorityTypeLabel.withText('Independent Authority Rep').count).eql(1, {timeout: 3000});
    log.info('Authority type label verified');
  }

  async verifyAuthorityContactName() {
    await t.expect(this.authorityContactName.withText('Automation').count).eql(1, {timeout: 3000});
    log.info('Authority contact name verified');
  }

  async clickEditContactButton(){
    await t.click(this.editContactButton);
    log.info("Edit Authority Contact Button Clicked");
  }

  async editAuthorityContact(){
    await t.typeText(this.contactFirstName, 'EDXAutomation2', { replace: true });
    await t.typeText(this.contactLastName, 'Testing2', { replace: true });
    await t.typeText(this.contactEditEmail, 'test2@test.com', { replace: true });
    await t.typeText(this.contactEditPhoneNumber, '2501234564', { replace: true });
    await t.typeText(this.contactEditPhoneExt, '888', { replace: true });
    await t.typeText(this.contactEditAltPhoneNumber, '2508854578', { replace: true });
    await t.typeText(this.contactEditAltPhoneExt, '999', { replace: true });

    await this.selectStartDate();

    await t.click(this.saveContactButton);
    log.info("Authority Contact Edit Complete");
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

  async verifyAuthorityContactDetails() {

    await this.verifyContactName('EDXAutomation2 Testing2');
    await this.verifyContactEmail('test2@test.com');
    await this.verifyContactPhoneNum('250-123-4564');
    await this.verifyContactPhoneNumExt('888');
    await this.verifyContactAltPhoneNum('250-885-4578');
    await this.verifyContactAltPhoneNumExt('999');
    await this.verifyContactStartDate('2022/01/01');
    log.info('Contact Verification Complete');
  }
  async verifyContactName(name){
    await t.expect(this.authorityContactName.withText(name).innerText).contains(name);
    log.info(`Contact Name ${name} Verified`);
  }
  async verifyContactEmail(email){
    await t.expect(this.authorityContactEmail.withText(email).innerText).contains(email);
    log.info(`Contact Email ${email} Verified`);
  }
  async verifyContactPhoneNum(phoneNumber){
    await t.expect(this.authorityContactPhoneNumber.withText(phoneNumber).innerText).contains(phoneNumber);
    log.info(`Contact Phone Number ${phoneNumber} Verified`);
  }
  async verifyContactPhoneNumExt(phoneNumberExt){
    await t.expect(this.authorityContactPhoneNumberExt.withText(phoneNumberExt).innerText).contains(phoneNumberExt);
    log.info(`Contact Phone Number Extension ${phoneNumberExt} Verified`);
  }
  async verifyContactAltPhoneNum(altPhoneNumber){
    await t.expect(this.authorityContactAltPhoneNumber.withText(altPhoneNumber).innerText).contains(altPhoneNumber);
    log.info(`Contact Alternate Phone Number ${altPhoneNumber} Verified`);
  }
  async verifyContactAltPhoneNumExt(altPhoneNumberExt){
    await t.expect(this.authorityContactAltPhoneNumberExt.withText(altPhoneNumberExt).innerText).contains(altPhoneNumberExt);
    log.info(`Contact Alternate Phone Number Extension ${altPhoneNumberExt} Verified`);
  }
  async verifyContactStartDate(startDate){
    await t.expect(this.authorityContactStartDate.withText(startDate).innerText).contains(startDate);
    log.info(`Contact Start Date ${startDate} Verified`);
  }
}

export default AuthoritiesContactsPage
