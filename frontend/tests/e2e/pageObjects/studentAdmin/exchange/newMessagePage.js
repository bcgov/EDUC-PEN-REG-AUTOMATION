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

  async selectSchoolNameOption(data) {
    await t.click(Selector('div.v-list-item__title').withText(data));
    log.info('school name option selected')
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