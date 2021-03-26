import { Selector, t } from 'testcafe'
const log = require('npmlog')

class studentAuditHistoryDetailsPage {

    constructor() {

        this.closeButton = Selector('#closePanel')
        this.viewPenRequestButton = Selector('#viewRequest')
        this.revertButton = Selector('#revertData')
        this.confirmPopupButton = Selector('#resolveBtn')
        this.splitPenButton = Selector('#splitPen')


        //Student information
        this.usualSurname = Selector('#UsualLastName')
        this.usualGiven = Selector('#UsualFirstName')
        this.usualMiddle = Selector('#UsualMiddleNames')


        //split model related
        this.currentLegalLastName = Selector('#currentLegalLastName')
        this.acceptSplitPenButton = Selector('#acceptSplitPen')
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

    async verifySplitPenButtonDisabled(){
        await t.expect(this.splitPenButton.hasAttribute('disabled')).ok();
        log.info("Revert button is disabled")
    }

    async clickSplitPenButton(){
        await t.click(this.splitPenButton)
        log.info("split pen button clicked")
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

    async verifyStudentInformationReverted(studentData){
        await t.expect(this.usualSurname.value).eql(studentData.data.usualLastName)
        await t.expect(this.usualGiven.value).eql(studentData.data.usualFirstName)
        await t.expect(this.usualMiddle.value).eql(studentData.data.usualMiddleNames)
        log.info("Reverts verified")
    }

    async verifyMessage(data) {
        let element = Selector('div').withText(data).with({timeout: 30000})
        await t.expect(element.exists).ok({timeout: 30000})
        log.info(data + " Message verified")
    }

    async splitModelRevertCheckBox(){
        const revertCheckBox = Selector('input').withAttribute('role', 'checkbox');
        await t.click(revertCheckBox , {timeout: 10000})
        log.info("revert checkbox clicked on split model")
    }

    async verifyCurrentLegalLastName(data){
        await t.expect(this.currentLegalLastName.value).eql(data , {timeout: 10000})
        log.info("Current legal last name verified")
    }

    async clickAcceptSplitPenButton(){
        await t.click(this.acceptSplitPenButton)
        log.info("accept split pen button clicked")
    }

} export default studentAuditHistoryDetailsPage 
