import { Selector, t } from 'testcafe'
const log = require('npmlog')

class MessageDisplayPage {

  constructor() {
    this.editOptionsMenuButton = Selector('#editOptionsMenuBtn');
    this.newMessageButton = Selector('#newMessageToConvBtn');
    this.newMessageTextArea = Selector ('#newMessageToConvTextArea');
    this.sendMessageButton = Selector('#newMessagePostBtn');
  }

  async verifyMessageDetail() {
    await t.expect(Selector('.v-card__text')
    .withExactText('automation test').count)
    .eql(1)
    log.info("exchange message detail comment history verified")
  }

  async clickOnNewMessage(){
    await t.click(this.editOptionsMenuButton);
    await t.click(this.newMessageButton);
  }

  async sendANewMessageToTheExistingExchange(){
    await t.click(this.newMessageTextArea).typeText(this.newMessageTextArea(), 'Test-Automation Message 2', {timeout: 20000});
    await t.click(this.sendMessageButton);
  }

  async verifyNewCommentSent() {
    await t.expect(Selector('.v-card__text')
      .withExactText('Test-Automation Message 2').count)
      .eql(1)
    log.info("exchange message detail new comment history verified")
  }
}

export default MessageDisplayPage
