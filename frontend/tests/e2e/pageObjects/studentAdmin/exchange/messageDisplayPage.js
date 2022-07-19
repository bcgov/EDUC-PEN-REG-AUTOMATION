import { Selector, t } from 'testcafe'
const log = require('npmlog')

class MessageDisplayPage {

  constructor() {
    this.editOptionsMenuButton = Selector('#editOptionsMenuBtn');
    this.newMessageButton = Selector('#newMessageToConvBtn');
    this.newMessageTextArea = Selector ('#newMessageToConvTextArea');
    this.sendMessageButton = Selector('#newMessagePostBtn');
    this.addAttachmentButton = Selector('#addAttachmentConvButton');
  }

  async verifyMessageDetail() {
    //timeout added to allow for large file to upload before checking text
    await t.expect(Selector('.v-card__text')
    .withExactText('automation test').count)
    .eql(1, {timeout: 60000})
    log.info("Exchange message detail first comment found")
    await t.expect(Selector('.v-card__text')
    .withExactText('BC.jpg').count)
    .eql(1)
    log.info("Exchange message attachment during create found")
    await t.expect(Selector('.v-card__text')
    .withExactText('10MbFile.jpg').count)
    .eql(1)
    log.info("Exchange message attachment added after create found")
  }

  async clickOnNewMessage(){
    await t.click(this.editOptionsMenuButton);
    await t.click(this.newMessageButton);
  }

  async clickEditOptionsMenu(){
    await t.click(this.editOptionsMenuButton);
    log.info('Edit options menu clicked');
  }

  async clickAttachmentsButton(){
    await t.click(this.addAttachmentButton);
    log.info('Add attachment menu option clicked')
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
