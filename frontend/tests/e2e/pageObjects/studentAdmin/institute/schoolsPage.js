import { Selector, t } from 'testcafe'
const log = require('npmlog')

class SchoolsPage {
  constructor() {
    //search box
    this.schoolNameTextField = Selector('#name-text-field');
    this.schoolStatusSelectField = Selector('#status-select-field').parent('div[role="button"]');
    this.schoolSearchButton = Selector('#user-clear-button');

    //search results
    this.schoolSearchResultsText = Selector('tr td');
	this.schoolContactsButton = Selector('#schoolContacts');
  }

  async clickSearchButton() {
    await t.click(this.schoolSearchButton());
    log.info("search button clicked");
  }

  async setName(text) {
    await t.typeText(this.schoolNameTextField, text);
    log.info(`School name:: ${text} entered`);
  }

  async selectNameOptionByIndex(index = 0) {
    const option = Selector('div.v-select-list').child(index);
    const optionSelectedText = await option.innerText;
    await t.click(option);
    log.info(`name option ${optionSelectedText} selected`);
  }

  async selectStatus(index = 0){
    await t.click(this.schoolStatusSelectField);
    const option = Selector('div.v-select-list').child(0).nth(index);
    const optionSelectedText = await option.innerText;
    await t.click(option);
    log.info(`status option ${optionSelectedText} selected`);

  }

  async verifySchoolSearchResults(name) {
    await t.expect(this.schoolSearchResultsText.withText(name).count).eql(1, {timeout: 3000});
    log.info("One school found after search");
    await t.expect(this.schoolSearchResultsText.nth(0).innerText).contains(name);
    log.info('School search result verified');
  }

  async clickSchoolSearchResult() {
    await t.click(this.schoolSearchResultsText.nth(0));
    log.info("School Result Clicked");
  }
  
  async clickSchoolSearchResultContacts() {
    await t.click(this.schoolContactsButton);
    log.info("School Contacts Button Clicked");
  }
}

export default SchoolsPage
