import { Selector, t } from 'testcafe'
const log = require('npmlog')

class DistrictContactsPage {
  constructor() {
    this.districtNameField = Selector('.subjectHeading');
    this.districtContactTypeLabel = Selector('h2');
    this.districtContactName = Selector('strong');
  }

  async verifyDistrictNumberAndName(name) {
    await t.expect(this.districtNameField.withText(name).count).eql(1, {timeout: 3000});
    log.info(`District detail name and number ${name} verified`);
  }

  async verifyDistrictContactTypeLabel() {
    await t.expect(this.districtContactTypeLabel.withText('Superintendent').count).eql(1, {timeout: 3000});
    log.info('District type label verified');
  }

  async verifyDistrictContactName() {
    await t.expect(this.districtContactName.withText('Automation').count).eql(1, {timeout: 3000});
    log.info('District contact name verified');
  }
}

export default DistrictContactsPage
