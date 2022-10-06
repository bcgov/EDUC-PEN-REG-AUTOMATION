import { Selector, t } from 'testcafe'
const log = require('npmlog')

class AuthoritiesDetailsPage {
  constructor() {
    this.authorityNameField = Selector('#authorityName');
  }

  async verifyAuthorityNumberAndName(name) {
    await t.expect(this.authorityNameField.withText(name).count).eql(1, {timeout: 3000});
    log.info('Authority detail name and number verified');
  }
}

export default AuthoritiesDetailsPage
