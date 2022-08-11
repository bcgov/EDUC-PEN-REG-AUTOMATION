import { Selector, t } from 'testcafe'
const log = require('npmlog')

class ExchangePage {
  constructor() {

    this.ministryTeamInboxTitle = Selector('#ministryTeamInboxTitle');

    //Buttons
    this.claimButton = Selector('#claimBTN')

    //search boxes
    this.searchSubject = Selector('#subject-text-field')
    this.claimedBy = Selector('#claimed-by-text-field')

    //Filter
    this.moreFilterButton = Selector('#filterid')
    this.searchButton = Selector('#searchButton')
    this.contactFilter = Selector('#schoolName')
    this.messageDateFilter = Selector('#messageDateTextField')
    let now = new Date()
    this.messageDateNumber = Selector('div').child('.v-date-picker-table').find('.v-btn__content').withText(now.getDate().toString())

    //new message
    this.newMessageButton = Selector('#newMessageBtn')
    this.schoolNameTextField = Selector('#schoolNameTxtField')
    this.newMessageTextArea = Selector('#newMessageTextArea')
    this.subjectTextField = Selector('#subjectTxtField')
    this.attachFileButton = Selector('#attachFileID')
    this.newMessagePostButton = Selector('#newMessagePostBtn')

    this.statusSelector = Selector('#statusSelector').parent('div[role="button"]');
    this.statusBox = Selector('div[role="listbox"]');
  }

  async verifyMinistryTeamInboxTitle(title) {
    await t.expect(this.ministryTeamInboxTitle.innerText).eql(title);
    log.info('Verified Ministry Team Inbox Title.');
  }

  async selectStatus(status){
    await t.click(this.statusSelector).wait(100);
    await t.expect(this.statusBox().exists).ok();
    await t.click(this.statusBox.find('span').withExactText(status).parent('div.row'));
    log.info("Status " + status + " selected");
  }

  async selectContactFilterSchoolByName(contactName) {
    await t.typeText(this.contactFilter, contactName)
    await t.click(Selector('div').child('.v-list-item__title').find('.v-list-item__mask').withText(contactName));
  }

  async selectSchoolByName(contactName) {
    await t.typeText(this.schoolNameTextField, contactName)
    await this.selectSchoolNameOptionByIndex(0);
  }

  async selectMessageDate() {
    await t.click(this.messageDateFilter())
    await t.click(this.messageDateNumber())
    log.info("Message date selected")
  }

  async clickSearchFilterButton() {
    await t.click(this.searchButton())
    log.info("Filter search button clicked")
  }

  async clickClaimButton() {
    await t.click(this.claimButton())
    log.info("Claim button clicked")
  }

  async clickMoreFilterButton() {
    await t.click(this.moreFilterButton())
    log.info("More filters button clicked")
  }

  async setSubjectSearch(data) {
    await t.typeText(this.searchSubject, data)
    log.info("search subject text entered")
  }

  async setClaimedBy(data) {
    await t.typeText(this.claimedBy, data)
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

  async selectFirstTableRow() {
    await t.click((Selector('div.v-data-table__checkbox')))
    log.info(`Selected first row`)
  }

  async verifyClaimSnackbar() {
    await t.wait(2000)
    await t.expect(Selector('div').child('.v-snack__content')
      .withExactText('Secure exchanges have been claimed successfully.').count)
      .eql(1)
    log.info("Claim was successful")
  }

  async verifySearchResults() {
    await t.expect(Selector('div').child('.subjectHeading')
    .withExactText('automation test').count)
    .eql(1)
    log.info("exchange message search results verified")
  }

  async clickSetSchoolName() {
    await t.click(this.schoolNameTextField)
    log.info("select school name clicked")
  }

  async clickNewMessagePostButton() {
    await t.click(this.newMessagePostButton())
    log.info("sending new exchange message button clicked")
  }

  async clickAttachFileButton() {
    await t.click(this.attachFileButton());
    log.info("attach file button clicked");
  }

  async selectSchoolNameOptionByIndex(index = 0) {
    const schoolOption = await Selector('div.v-select-list').nth(index);
    const schoolOptionSelectedText = await schoolOption.innerText;
    await t.click(schoolOption);
    log.info(`School option ${schoolOptionSelectedText} selected`)
  }

  async selectContactNameOptionByIndex(index = 0) {
    const schoolOption = await Selector('div.v-list').nth(index);
    await t.click(schoolOption);
    log.info(`Contact option ${schoolOptionSelectedText} selected`)
  }

  async setNewMessageText(data) {
    await t.typeText(this.newMessageTextArea(), data)
    log.info("new message text entered")
  }

  async setSubject(data) {
    await t.typeText(this.subjectTextField, data)
    log.info("new message subject text entered")
  }
}

export default ExchangePage