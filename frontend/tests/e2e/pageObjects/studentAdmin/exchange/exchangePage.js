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
    this.selectFileInputButton = Selector('div').find('.fa-paperclip');
    this.newMessagePostButton = Selector('#newMessagePostBtn')
    this.searchPenButton = Selector('#searchPenBtn');
    this.addStudentButton = Selector('#addStudentID');
    this.studentPenTextField = Selector('#studentPenTextField');
    this.addStudentToNewMessageButton = Selector('#addStudentToNewMessageBtn');
    this.newMessageStudentChip = Selector('#studentChip-0');
    this.addStudentAlert = Selector('#addStudentAlert');
    this.cancelAddStudentButton = Selector('#cancelAddStudentBtn');

    this.statusSelector = Selector('#statusSelector').parent('div[role="button"]');
    this.statusBox = Selector('div[role="listbox"]');
  }

  async verifyMinistryTeamInboxTitle(title) {
    await t.expect(this.ministryTeamInboxTitle.textContent).eql(title, {timeout: 30000});
    log.info(`Verified Ministry Team Inbox Title.`);
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
    await t.typeText(this.schoolNameTextField, contactName).takeScreenshot();
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
    await t.click(this.schoolNameTextField).takeScreenshot();
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

  async clickSelectFileInputButton() {
    await t.click(this.selectFileInputButton());
    log.info("attach file prompt button clicked");
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
    await t.typeText(this.subjectTextField, data).takeScreenshot();
    log.info("new message subject text entered")
  }

  async checkAddStudentButtonToMsgIsDisabled() {
    await t.expect(this.addStudentButton.visible).ok();
    const button = this.addStudentButton.with({visibilityCheck: true}).withExactText('Add Student');
    await t.expect(button.hasAttribute('disabled')).ok();
  }

  async clickOnAddStudentButtonInNewMessage() {
    await t.expect(this.addStudentButton.visible).ok().click(this.addStudentButton);
    log.info('Add Student Button Clicked');
  }

  async addStudentPenToSearchInNewMessage(pen) {
    await t.click(this.studentPenTextField);
    await t.typeText(this.studentPenTextField, pen);
    log.info('Pen details input in Add Student');
  }

  async checkSearchPenButtonIsDisabled() {
    await t.expect(this.searchPenButton.visible).ok();
    const button = this.searchPenButton.with({visibilityCheck: true}).withExactText('Search');
    await t.expect(button.hasAttribute('disabled')).ok();
    log.info('Check Search PEN button is disabled');
  }

  async checkAddStudentButtonIsDisabled() {
    await t.expect(this.addStudentToNewMessageButton.visible).ok();
    const button = this.addStudentToNewMessageButton.with({visibilityCheck: true}).withExactText('Add');
    await t.expect(button.hasAttribute('disabled')).ok();
    log.info('Check Add Student button is disabled');
  }

  async clearPenSearchText() {
    await t
        .selectText(this.studentPenTextField)
        .pressKey('delete');
    log.info('Pen Details cleared from Search field');
  }

  async checkSearchPenButtonIsEnabled() {
    await t.expect(this.searchPenButton.visible).ok();
    const button = this.searchPenButton.with({visibilityCheck: true}).withExactText('Search');
    await t.expect(button.hasAttribute('disabled')).notOk();
  }

  async clickPenSearchButton() {
    await t.click(this.searchPenButton());
    log.info('Pen Search Button Clicked');
  }

  async checkAddStudentButtonIsEnabled() {
    await t.expect(this.addStudentToNewMessageButton.visible).ok();
    const button = this.addStudentToNewMessageButton.with({visibilityCheck: true}).withExactText('Add');
    await t.expect(button.hasAttribute('disabled')).notOk();
  }

  async clickAddStudentButton() {
    await t.click(this.addStudentToNewMessageButton);
    log.info('Add Student To New Message Button clicked');
  }

  async studentAddedToNewMessageWithPen(pen) {
    await t.expect(this.newMessageStudentChip.innerText).contains(pen);
    log.info('Student details added to the New Message');
  }

  async assertAlertMessageAtAddStudent(message) {
    await t.expect(this.addStudentAlert.innerText).contains(message, {timeout: 10000});
  }

  async clickCancelAddStudentButton() {
    await t.click(this.cancelAddStudentButton());
    log.info('Cancel Add Student button clicked');
  }

}

export default ExchangePage