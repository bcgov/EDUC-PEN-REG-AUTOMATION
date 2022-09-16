import { Selector, t } from 'testcafe'
const log = require('npmlog')

class DistrictsPage {
  constructor() {
    //search box
    this.districtNameTextField = Selector('#name-text-field');
    this.districtSearchButton = Selector('#district-search-button');

    //search results
    this.districtSearchResultsText = Selector('.v-card .v-card__text');
  }

  async clickSearchButton() {
    await t.click(this.districtSearchButton());
    log.info("search button clicked");
  }

  async setName(text) {
    await t.typeText(this.districtNameTextField, text)
    log.info(`District name:: ${text} entered`);
  }

  async verifyDistrictSearchResults() {
    await t.expect(this.districtSearchResultsText.withText('Arrow').count).eql(1, {timeout: 3000});
    log.info("One district found after search");
    await t.expect(this.districtSearchResultsText.innerText).contains('Arrow');
    log.info('District search result verified');
  }
}

export default DistrictsPage