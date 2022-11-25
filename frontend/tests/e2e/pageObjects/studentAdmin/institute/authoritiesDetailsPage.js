import { Selector, t } from 'testcafe'
const log = require('npmlog')

class AuthoritiesDetailsPage {
  constructor() {
    this.authorityNameField = Selector('#authorityName');
    this.editAuthorityButton = Selector('#editButton');
    this.saveAuthorityEditButton = Selector('#saveButton');
    this.authorityPhoneNumberInput = Selector('#phoneNumberField');
    this.authorityPhoneNumberSpan = Selector('span');
    this.authorityEmailInput = Selector('#emailField');
    this.authorityMAddressLine1 = Selector('#mailAddressLine1');
    this.authorityMAddressCity = Selector('#mailAddressCity');
    this.authorityMAddressProv = Selector('#mailAddressProvince').parent('div[role="button"]');
    this.authorityMAddressCountry = Selector('#mailAddressCountry').parent('div[role="button"]');
    this.authorityMAddressPostal = Selector('#mailAddressPostal');
    this.authorityEmailSpan = Selector('span');
  }

  async verifyAuthorityNumberAndName(name) {
    await t.expect(this.authorityNameField.withText(name).count).eql(1, {timeout: 3000});
    log.info('Authority detail name and number verified');
  }

  async verifyAuthorityPhoneNumber(phoneNumber){
    await t.expect(this.authorityPhoneNumberSpan.withText(phoneNumber).innerText).contains(phoneNumber);
    log.info('Authority Phone Number Verified');
  }

  async verifyAuthorityEmailAddress(email){
    await t.expect(this.authorityEmailSpan.withText(email).innerText).contains(email);
    log.info('Authority Email Verified');
  }

  async clickEditAuthorityButton(){
    await t.click(this.editAuthorityButton);
    log.info("Edit Authority Contact Button Clicked");
  }

  async clickSaveAuthorityEditButton(){
    await t.click(this.saveAuthorityEditButton);
    log.info("Save Authority Contact Button Clicked");
  }

  async editAuthorityDetails(){
    await t.typeText(this.authorityPhoneNumberInput, '1011011100', {replace: true});
    await t.typeText(this.authorityEmailInput, 'test2@test.com', {replace: true});
    await t.typeText(this.authorityMAddressLine1, '123 Maple Dr', {replace: true})
    await t.typeText(this.authorityMAddressCity, 'Victoria', {replace: true})
    await this.selectMAddressProvince();
    await this.selectMAddressCountry();
    await t.typeText(this.authorityMAddressPostal, 'a1b2b3', {replace: true});


    log.info("Authority Details Edit Complete");
  }

  async selectMAddressProvince(index = 0){
    await t.click(this.authorityMAddressProv);
    const option = Selector('div.v-select-list').child(0).nth(index);
    const optionSelectedText = await option.innerText;
    await t.click(option);
    log.info(`Mailing Province option ${optionSelectedText} selected`);

  }

  async selectMAddressCountry(index = 1){
    await t.click(this.authorityMAddressCountry);
    const option = Selector('div.v-select-list').child(0).nth(index);
    const optionSelectedText = await option.innerText;
    await t.click(option);
    log.info(`Mailing Address Country option ${optionSelectedText} selected`);

  }
}

export default AuthoritiesDetailsPage
