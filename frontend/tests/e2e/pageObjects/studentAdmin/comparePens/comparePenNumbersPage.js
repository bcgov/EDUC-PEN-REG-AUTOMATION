import { Selector, t } from 'testcafe'
const log = require('npmlog')


class comparePenNumbersPage {

    constructor() {

        this.penNumberTextField = Selector('#enterAPenTxtField')
        this.addPenButton = Selector('#addPenBtn')
        this.removePenLink = Selector('a').withText('Remove PEN')
        this.clearButton = Selector('#compareClearBtn')
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
}
export default comparePenNumbersPage