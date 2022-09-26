import { Selector, t } from 'testcafe'
const log = require('npmlog')

class AccessPage {
  constructor() {
    //inputs
    this.selectInstitute = Selector('#selectInstituteName');

    //buttons
    this.manageInstituteButton = Selector('#manageInstituteButton');
    this.copyPrimaryEdxActivationCodeButton = Selector("#copyPrimaryEdxActivationCodeButton");
    this.toggleGenerateNewPrimaryEdxActivationCodeDialogVisibilityButton = Selector("#toggleGenerateNewPrimaryEdxActivationCodeDialogVisibilityButton");
    this.doGeneratePrimaryEdxActivationCodeButton = Selector("#doGeneratePrimaryEdxActivationCodeButton");
    this.closeGenerateNewPrimaryEdxActivationCodeDialogButton = Selector("#closeGenerateNewPrimaryEdxActivationCodeDialogButton");

    //Display texts and Dialogs
    this.primaryEdxActivationCode = Selector("#primaryEdxActivationCode");
    this.generateNewPrimaryEdxActivationCodeDialog = Selector("#generateNewPrimaryEdxActivationCodeDialog");

    //Cached values
    this.knownPrimaryEdxActivationCode = '';
  }

  async setInstituteName(instituteName) {
    await t.wait(1000); //provides additional time for the institute list to load in
    await t.typeText(this.selectInstitute, instituteName)
    log.info(`Institute name ${instituteName} text entered`)
  }

  async selectInstituteNameOptionByIndex(index = 0) {
    const instituteOption = Selector('div.v-select-list').nth(index);
    const instituteOptionSelectedText = await instituteOption.innerText;
    await t.click(instituteOption);
    log.info(`Institute option ${instituteOptionSelectedText} selected`);
  }

  async clickManageInstituteButton() {
    await t.click(this.manageInstituteButton());
    log.info('Manage institute button clicked');
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
    this.knownPrimaryEdxActivationCode = this.primaryEdxActivationCode.innerText;
    log.info(`Remembered ${this.knownPrimaryEdxActivationCode} as the Primary EDX Activation Code.`);
    await t.click(this.closeGenerateNewPrimaryEdxActivationCodeDialogButton);
    log.info('closeGenerateNewPrimaryEdxActivationCodeDialogButton clicked.');
  }

  async verifyPrimaryEdxActivationCodeChanged() {
    await t.expect(this.primaryEdxActivationCode.innerText).notEql(this.knownPrimaryEdxActivationCode);
    log.info('Verified that the Primary EDX Activation Code changed.');
  }

  async verifyCopyPrimaryEdxActivationCodeButtonExists() {
    await t.expect(this.copyPrimaryEdxActivationCodeButton.exists).ok();
    log.info('Verified that the Copy Primary EDX Activation Code Button exists.');
  }

  async verifyCopyPrimaryEdxActivationCodeButtonDoesNotExist() {
    await t.expect(this.copyPrimaryEdxActivationCodeButton.exists).notOk();
    log.info('Verified that the Copy Primary EDX Activation Code Button does not exist.');
  }

  async verifyCopyPrimaryEdxActivationCodeButtonValueMatchesPrimaryEdxActivationCode() {
    let primaryEdxActivationCode = (await this.primaryEdxActivationCode.innerText).replace('Primary Activation Code:', '').trim();
    await t.expect(this.copyPrimaryEdxActivationCodeButton.withAttribute('title', `copy ${primaryEdxActivationCode} to clipboard`).exists).ok();
    log.info('Verified that the Copy Primary EDX Activation Code Button\'s value matches the Primary Edx Activation Code.');
  }
}

export default AccessPage
