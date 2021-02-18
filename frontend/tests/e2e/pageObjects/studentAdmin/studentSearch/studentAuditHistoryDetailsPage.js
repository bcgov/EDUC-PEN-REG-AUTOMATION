import { Selector, t } from 'testcafe'
const log = require('npmlog')

class studentAuditHistoryDetailsPage {

    constructor() {

        this.closeButton = Selector('#closePanel')
        this.viewPenRequestButton = Selector('#viewRequest')
        this.revertButton = Selector('#revertData')

    }

    async clickCloseButton() {
        await t.click(this.closeButton)
        log.info("close panel button clicked")
    }

    async clickViewPenRequestButton() {
        await t.click(this.viewPenRequestButton)
        log.info("view pen request button clicked")
    }

    async clickRevertButton() {
        await t.click(this.revertButton)
        log.info("rever button clicked")
    }





} export default studentAuditHistoryDetailsPage 
