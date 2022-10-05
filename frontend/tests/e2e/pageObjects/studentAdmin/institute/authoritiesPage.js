import { Selector, t } from 'testcafe'
const log = require('npmlog')

class AuthoritiesPage {
  constructor() {
    //search box
    this.authorityNameTextField = Selector('#authority-text-field');
    this.authorityStatusSelectField = Selector('#status-select-field');
    this.authoritySearchButton = Selector('#user-search-button');
    this.authorityClearButton = Selector('#user-clear-button');

    this.statusSelector = Selector('#status-select-field').parent('div[role="button"]');
    this.statusBox = Selector('div[role="listbox"]');

    this.authTypeSelector = Selector('#authoritytype-select-field').parent('div[role="button"]');
    this.authTypeBox = Selector('div[role="listbox"]');

    //search results
    this.authoritySearchResultsText = Selector('tr td');
  }

  async clickSearchButton() {
    await t.click(this.authoritySearchButton());
    log.info("Search button clicked");
  }

  async clickClearButton() {
    await t.click(this.authorityClearButton());
    log.info("Clear button clicked");
  }

  async setName(text) {
    await t.typeText(this.authorityNameTextField, text);
    log.info(`Authority name:: ${text} entered`);
  }

  async selectNameOptionByIndex(index = 0) {
    const option = Selector('div.v-select-list').child(index);
    const optionSelectedText = await option.innerText;
    await t.click(option);
    log.info(`name option ${optionSelectedText} selected`);
  }

  async selectStatus(status){
    await t.click(this.statusSelector).wait(100);
    await t.expect(this.statusBox().exists).ok();
    await t.click(this.statusBox.find('div').withExactText(status).parent('div.v-list-item__content'));
    log.info("Status " + status + " selected");
  }

  async selectAuthorityType(authType){
    await t.click(this.authTypeSelector()).wait(100);
    await t.expect(this.authTypeBox().exists).ok();
    await t.click(this.authTypeBox.find('div').withExactText(authType).parent('div.v-list-item__content'));
    log.info("Authority type " + authType + " selected");
  }

  async verifyAuthoritySearchResults(name) {
    await t.expect(this.authoritySearchResultsText.withText(name).count).eql(1, {timeout: 3000});
    log.info("One authority found after search");
    await t.expect(this.authoritySearchResultsText.nth(0).innerText).contains(name);
    log.info('Authority search result verified');
  }
}

export default AuthoritiesPage
