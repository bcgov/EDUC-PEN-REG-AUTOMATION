import { Selector, t } from 'testcafe'
const log = require('npmlog')

class AccessUsersPage {
  constructor() {
    //text fields
    this.searchName = Selector('#name-text-field');

    //buttons
    this.searchButton = Selector('#user-search-button');

  }

  async setName(name) {
    await t.typeText(this.searchName, name);
    log.info(`name text entered`);
  }

  async clickSearchButton() {
    await t.click(this.searchButton);
    log.info(`search button clicked`);
  }

  async verifyUserAccessAndSearchResults() {
    await t.expect(Selector('.v-card', {timeout: 3000}).count).eql(1);
    log.info("one user found after search");
    await t.expect(Selector('.v-card .v-card__title').innerText).contains('automation tester');
    log.info("correct user found")
    await t.expect(Selector('.v-card .v-card__text').innerText).eql('Secure Exchange');
    log.info("permissions verified for user");
    log.info("user access permissions and search results verified")
  }

}

export default AccessUsersPage
