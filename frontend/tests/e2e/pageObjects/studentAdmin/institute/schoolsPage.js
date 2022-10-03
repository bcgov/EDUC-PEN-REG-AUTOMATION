import { Selector, t } from 'testcafe'
const log = require('npmlog')

class SchoolsPage {
  constructor() {
    //search box
    this.schoolNameTextField = Selector('#name-text-field');
    this.schoolStatusSelectField = Selector('#status-select-field');
    this.schoolSearchButton = Selector('#user-clear-button');

    //search results
    this.schoolSearchResultsText = Selector('tr td');
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

  async verifySchoolSearchResults() {
    await t.expect(this.schoolSearchResultsText.withText('Mount Baker Secondary').count).eql(1, {timeout: 3000});
    log.info("One school found after search");
    await t.expect(this.schoolSearchResultsText.nth(0).innerText).contains('Mount Baker Secondary');
    log.info('School search result verified');
  }
}

export default SchoolsPage
