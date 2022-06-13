import { Selector, t } from 'testcafe'
const log = require('npmlog')

class AccessPage {
  constructor() {
    //inputs
    this.selectSchool = Selector('#selectSchoolName');

    //buttons
    this.manageSchoolButton = Selector('#manageSchoolButton');
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
}

export default AccessPage
