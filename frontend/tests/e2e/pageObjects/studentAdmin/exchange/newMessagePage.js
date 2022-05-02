import { Selector, t } from 'testcafe'
const log = require('npmlog')

class NewMessagePage {
  constructor() {

    this.schoolNameTextField = Selector('#schoolNameTxtField')
    this.newMessageTextArea = Selector('#newMessageTextArea')
    this.subjectTextField = Selector('#subjectTxtField')
    this.newMessagePostButton = Selector('#newMessagePostBtn')
  }

  async clickSetSchoolName() {
    await t.click(this.schoolNameTextField)
    log.info("select school name clicked")
  }

  async clickNewMessagePostButton() {
    await t.click(this.newMessagePostButton())
    log.info("sending new exchange message button clicked")
  }

  async selectSchoolNameOptionByIndex(index = 0) {
    const schoolOption = await Selector('div.v-select-list').nth(index);
    const schoolOptionSelectedText = await schoolOption.innerText;
    await t.click(schoolOption);
    log.info(`school option ${schoolOptionSelectedText} selected`)
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

export default NewMessagePage