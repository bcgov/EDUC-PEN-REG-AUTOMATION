import { Selector, t } from 'testcafe'
const log = require('npmlog')

class messageDetailPage {
  constructor() {
  }

  async verifyMessageDetail() {
    await t.expect(Selector('.v-card__text')
    .withExactText('automation test').count)
    .eql(1)
    log.info("exchange message detail comment history verified")
  }
}

export default messageDetailPage