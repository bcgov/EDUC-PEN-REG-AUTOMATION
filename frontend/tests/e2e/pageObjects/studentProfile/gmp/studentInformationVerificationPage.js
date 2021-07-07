import { Selector, t } from 'testcafe'
const log = require('npmlog')
const assert = require('assert')

class studentInformationVerificationPage {

    constructor() {

        this.penCompleteText = Selector('p:nth-of-type(1)')
        this.penNumber = Selector('p:nth-of-type(2)')
        this.resubmittedText = Selector('p:nth-of-type(1) > strong:nth-of-type(1)')
    }


    async studentReceivedPen(data) {
        // assert.equal("Your PEN request is complete. Your PEN is:", await this.penCompleteText.innerText)
        await t.expect(this.penCompleteText.innerText).eql("Your PEN request is complete. Your PEN is:", { timeout: 30000 })
        assert.deepStrictEqual(data, await this.penNumber.innerText)
        log.info("Student received pen number")
    }

    async studentUnlinked(){
        //assert.equal("Your PEN request has now been re-submitted for processing.", await this.resubmittedText.innerText)
        await t.expect(this.resubmittedText.innerText).eql("Your PEN request has now been re-submitted for processing.", { timeout: 30000 })
        log.info("Student successfully unlinked with pen number")
    }

}
export default studentInformationVerificationPage