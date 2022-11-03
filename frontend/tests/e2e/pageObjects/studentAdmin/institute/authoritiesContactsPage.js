import { Selector, t } from 'testcafe'
const log = require('npmlog')

class AuthoritiesContactsPage {
  constructor() {
    this.authorityNameField = Selector('#authorityNameAndNumber');
    this.authorityTypeLabel = Selector('#authorityTypeLabel');
    this.authorityContactName = Selector('#authorityContactName');
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
}

export default AuthoritiesContactsPage
