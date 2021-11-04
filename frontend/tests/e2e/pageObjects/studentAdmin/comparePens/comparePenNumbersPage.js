import { Selector, t } from 'testcafe'
const log = require('npmlog')


class comparePenNumbersPage {

    constructor() {

        this.penNumberTextField = Selector('#enterAPenTxtField')
        this.addPenButton = Selector('#addPenBtn')
        this.removePenLink = Selector('a').withText('Remove Student')
        this.clearButton = Selector('#compareClearBtn')


        //Twins and merges related
        this.twinButton = Selector('#twinBtn')
        this.mergePensButton = Selector('#mergeBtn')
        this.deMergePensButton = Selector('#demergeBtn')

        //Merge screen related
        this.memo = Selector('#memo')
        this.mergeButton = Selector('button.v-btn.v-btn--contained.theme--dark.v-size--default:nth-child(2)')

        //Pop up buttons
        this.noButton = Selector('#rejectBtn')
        this.yesButton = Selector('#resolveBtn')

    }


    async setPenNumber(data) {
        await t.typeText(this.penNumberTextField, data)
        log.info("Pen number is set")
    }

    async clickAddPenButton() {
        await t.click(this.addPenButton)
        log.info("add pen button is clicked")
    }

    async clickRemovePenLink() {
        await t.click(this.removePenLink)
        log.info("Remove pen link is clicked")
    }

    async clickClearButton() {
        await t.click(this.clearButton)
        log.info("clear button is clicked")
    }

    async clickTwinButton() {
        await t.click(this.twinButton)
        log.info("Twin button clicked")
        await t.wait(2000)
    }

    async verifyMessage(data) {
        let element = Selector('div').withText(data).with({timeout: 30000})
        await t.expect(element.exists).ok({timeout: 30000})
        log.info(data + " Message verified")
    }

    async clickMergePensButton() {
        await t.click(this.mergePensButton)
        log.info("Merge Pens button clicked")
    }

    async clickDeMergeButton() {
        await t.click(this.deMergePensButton)
        log.info("De Merge button clicked")
    }

    async selectStudentRecord(data) {
        const element = Selector('div:nth-of-type(' + data + ') > div:nth-of-type(1) > span:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > input:nth-of-type(1)')
        await t.click(element, { timeout: 3000 })
        log.info("Student selected")
    }

    async verifyTwinButtonDisabled() {
        await t.expect(this.twinButton.hasAttribute('disabled')).ok();
        log.info("Twin button is disabled")
    }

    async verifyMergeButtonDisabled() {
        await t.expect(this.mergePensButton.hasAttribute('disabled')).ok();
        log.info("Merge Pens button is disabled")
    }

    async verifyDemergeButtonDisabled() {
        await t.expect(this.deMergePensButton.hasAttribute('disabled')).ok();
        log.info("De Merge Pens button is disabled")
    }

    async setMemo(data) {
        await t.typeText(this.memo, data)
        log.info("memo is set")
    }

    async clickMergeButton() {
        await t.click(this.mergeButton)
        log.info("Merge button clicked")
    }

    async clickPopUpNoButton() {
        await t.click(this.noButton)
        log.info(" pop up no button clicked")
    }

    async clickPopUpYesButton() {
        await t.click(this.yesButton)
        log.info("pop up yes button clicked")
        await t.wait(10000)
    }

}
export default comparePenNumbersPage