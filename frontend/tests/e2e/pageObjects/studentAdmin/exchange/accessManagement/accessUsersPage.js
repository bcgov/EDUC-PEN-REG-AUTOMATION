import { Selector, t } from 'testcafe'
const log = require('npmlog')

class AccessUsersPage {
  constructor() {
    //text fields
    this.searchName = Selector('#name-text-field');

    //buttons
    this.searchButton = Selector('#user-search-button');
    this.newUserBtn = Selector('#new-user-button');
    this.navTitle = Selector('#navTitle');
    this.newUserVCard= Selector('#newUserInviteVCard');
    this.vCardTitle = Selector(('#newUserInviteVCardTitle'));
  }

  async setName(name) {
    await t.typeText(this.searchName, name);
    log.info(`name text entered`);
  }

  async clickSearchButton() {
    await t.click(this.searchButton);
    log.info(`search button clicked`);
  }
  async clickNewUserButton(){
    await t.click(this.newUserBtn);
    log.info(`New User button clicked`);
  }

  async verifyUserAccessAndSearchResults() {
    await t.expect((Selector('.v-card .v-card__title').withText('automation tester').count)).eql(1, {timeout: 3000});
    log.info("one user found after search");
    await t.expect(Selector('.v-card .v-card__title').innerText).contains('automation tester');
    log.info("correct user found")
    await t.expect(Selector('.v-card .v-card__text').innerText).eql('Secure Exchange');
    log.info("permissions verified for user");
    log.info("user access permissions and search results verified")
  }

}

export default AccessUsersPage
