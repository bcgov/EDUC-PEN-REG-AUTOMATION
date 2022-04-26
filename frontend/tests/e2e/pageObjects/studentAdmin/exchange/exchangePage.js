import { Selector, t } from 'testcafe'
const log = require('npmlog')

class exchangePage {
  constructor() {

    //search boxes
    this.searchSubject = Selector('#subject-text-field')
    this.searchReviewer = Selector('#reviewer-text-field')

    //new message
    this.newMessageButton = Selector('#newMessageBtn')
  }

  async setSubjectSearch(data) {
    await t.typeText(this.searchSubject, data)
    log.info("search subject text entered")
  }

  async setReviewerSearch(data) {
    await t.typeText(this.searchReviewer, data)
    log.info("search reviewer text entered")
  }

  async clickNewMessageButton() {
    await t.click(this.newMessageButton())
    log.info("new message button clicked")
  }

  async clickNthRow(index) {
    await t.click((Selector('tr')).nth(index))
    log.info(`row ${index} was clicked`)
  }

  async verifySearchResults() {
    await t.expect(Selector('tr > td')
    .withExactText('automation test').count)
    .eql(1)
    log.info("exchange message search results verified")
  }
}

export default exchangePage