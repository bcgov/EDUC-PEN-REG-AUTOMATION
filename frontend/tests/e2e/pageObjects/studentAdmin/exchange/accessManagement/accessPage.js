import { Selector, t } from 'testcafe'
const log = require('npmlog')

class AccessPage {
  constructor() {
    //inputs
    this.selectSchool = Selector('#selectSchoolName');

    //buttons
    this.manageSchoolButton = Selector('#manageSchoolButton');
    this.toggleGenerateNewPrimaryEdxActivationCodeDialogVisibilityButton = Selector("#toggleGenerateNewPrimaryEdxActivationCodeDialogVisibilityButton");
    this.doGeneratePrimaryEdxActivationCodeButton = Selector("#doGeneratePrimaryEdxActivationCodeButton");
    this.closeGenerateNewPrimaryEdxActivationCodeDialogButton = Selector("#closeGenerateNewPrimaryEdxActivationCodeDialogButton");

    //Display texts and Dialogs
    this.primaryEdxActivationCode = Selector("#primaryEdxActivationCode");
    this.generateNewPrimaryEdxActivationCodeDialog = Selector("#generateNewPrimaryEdxActivationCodeDialog");

    //Cached values
    this.knownPrimaryEdxActivationCode = '';
  }

  async setSchoolName(schoolName) {
    await t.typeText(this.selectSchool, schoolName)
    log.info(`school name ${schoolName} text entered`)
  }

  async selectSchoolNameOptionByIndex(index = 0) {
    const schoolOption = await Selector('div.v-select-list').nth(index);
    const schoolOptionSelectedText = await schoolOption.innerText;
    await t.click(schoolOption);
    log.info(`school option ${schoolOptionSelectedText} selected`);
  }

  async clickManageSchoolButton() {
    await t.click(this.manageSchoolButton());
    log.info('manage school button clicked');
  }

  async verifyGenerateNewPrimaryEdxActivationCodeDialogExists() {
    await t.expect(this.generateNewPrimaryEdxActivationCodeDialog.exists).ok();
    log.info('Verified generateNewPrimaryEdxActivationCodeDialog exists.');
  }

  async verifyGenerateNewPrimaryEdxActivationCodeDialogDoesNotExist() {
    await t.expect(this.generateNewPrimaryEdxActivationCodeDialog.exists).notOk();
    log.info('Verified generateNewPrimaryEdxActivationCodeDialog does not exists.');
  }

  async clickToggleGenerateNewPrimaryEdxActivationCodeDialogVisibilityButton() {
    await t.click(this.toggleGenerateNewPrimaryEdxActivationCodeDialogVisibilityButton);
    log.info('toggleGenerateNewPrimaryEdxActivationCodeDialogVisibilityButton clicked.')
  }

  async clickDoGeneratePrimaryEdxActivationCodeButton() {
    await t.click(this.doGeneratePrimaryEdxActivationCodeButton);
    log.info('doGeneratePrimaryEdxActivationCodeButton clicked.');
  }

  async clickCloseGenerateNewPrimaryEdxActivationCodeDialogButton() {
    this.knownPrimaryEdxActivationCode = this.primaryEdxActivationCode().innerText;
    log.info(`Remembered ${this.knownPrimaryEdxActivationCode} as the Primary EDX Activation Code.`);
    await t.click(this.closeGenerateNewPrimaryEdxActivationCodeDialogButton);
    log.info('closeGenerateNewPrimaryEdxActivationCodeDialogButton clicked.');
  }

  async verifyPrimaryEdxActivationCodeChanged() {
    await t.expect(this.primaryEdxActivationCode.innerText).notEql(this.knownPrimaryEdxActivationCode);
    log.info('Verified that the Primary EDX Activation Code changed.');
  }
}

export default AccessPage
