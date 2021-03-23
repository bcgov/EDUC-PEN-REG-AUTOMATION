import { Selector, t } from 'testcafe'
const log = require('npmlog')

class studentAuditHistoryDetailsPage {

    constructor() {

        this.closeButton = Selector('#closePanel')
        this.viewPenRequestButton = Selector('#viewRequest')
        this.revertButton = Selector('#revertData')
        this.confirmPopupButton = Selector('#resolveBtn')


        //Student information
        this.usualSurname = Selector('#UsualLastName')
        this.usualGiven = Selector('#UsualFirstName')
        this.usualMiddle = Selector('#UsualMiddleNames')

    }

    async clickOnAuditRecord(data){
        const element = Selector('span').withExactText(data)
        await t.wait(3000)
        await t.click(element)
        log.info("clicked on "+data+ " element")
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
        log.info("revert button clicked")
    }

    async verifyRevertButtonDisabled(){
        await t.expect(this.revertButton.hasAttribute('disabled')).ok();
        log.info("Revert button is disabled")
    }

    async clickPopupConfirmButton(){
        await t.click(this.confirmPopupButton)
        log.info("Confirm button clicked")
    }

    async verifyStudentInformationUpdated(data){
        await t.expect(this.usualSurname.value).eql(data.usualLastName)
        await t.expect(this.usualGiven.value).eql(data.usualFirstName)
        await t.expect(this.usualMiddle.value).eql(data.usualMiddleNames)
        log.info("Updates verified")
    }

    async verifyStudentInformationReverted(){
        await t.expect(this.usualSurname.value).eql('')
        await t.expect(this.usualGiven.value).eql('')
        await t.expect(this.usualMiddle.value).eql('')
        log.info("Reverts verified")
    }

} export default studentAuditHistoryDetailsPage 
