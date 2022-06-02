import { Selector, t } from 'testcafe'
const log = require('npmlog')

class studentProvideInformationPage {



    constructor() {

        this.respondHereTextBox = Selector('textarea:nth-of-type(1)')
        this.uploadButton = Selector('.order-first')
        this.documentDropDown = Selector('.v-select__selections')
        this.selectFile = Selector('input').withAttribute('type', 'file')
        this.uploadFormButton = Selector('#upload_form')
        this.uploadConfirmation = Selector('div.v-alert.mb-3.v-sheet.theme--light.v-alert--dense.v-alert--outlined.bootstrap-success div.v-alert__wrapper > div.v-alert__content')
        this.closeButton = Selector('button.white--text:nth-child(3)')
        this.doneButton = Selector('div.flex-grow-0:nth-child(2) > button:nth-child(1)')
        this.yesSubmitButton = Selector('button.ma-1:nth-child(2)')
        this.canNotUploadLargeFileMessage = Selector('.v-messages__message')

    }


    async setRespondHereTextBox(data) {
        await t.typeText(this.respondHereTextBox, data)
        log.info("Data entered in respond here text box")
    }

    async clickUploadButton() {
        await t.click(this.uploadButton)
        log.info("Upload button is clicked")
    }

    async setDocumentType(documentType) {
        await t.click(this.documentDropDown)
        log.info("Document dropdown clicked")
        this.documentType = Selector('div').withExactText(documentType)
        await t.click(this.documentType)
        log.info("Clicked on " + documentType + " option")
    }

    async uploadDocument(data) {
        await t.setFilesToUpload((this.selectFile), [data])
        log.info('file uploaded')
        await t.click(this.uploadFormButton)
        log.info('upload form button is clicked')
        await t.expect(this.uploadConfirmation.innerText).eql("File upload successful.", { timeout: 30000 })
        log.info('upload confirmation verified')
        await t.click(this.closeButton)
        log.info('close button is clicked')
    }

    async verifyMaxFileSizeError(data) {
        await t.setFilesToUpload((this.selectFile), [data])
        log.info('file uploaded')
        await t.expect(this.canNotUploadLargeFileMessage.innerText).eql("File size should not be larger than 10 MB!", { timeout: 30000 })
        log.info('File size should not be larger than 10 MB! text verified')
        await t.click(this.closeButton)
        log.info('close button is clicked')
    }

    async clickDoneButton() {
        await t.click(this.doneButton)
        log.info('Done button is clicked')
    }

    async clickYesSubmitButton() {
        await t.click(this.yesSubmitButton)
        log.info('Yes, Submit button is clicked')
    }


    async reloadPage() {
        await t.eval(() => location.reload())
        log.info("page reloaded")
    }


    async verifyText(data) {
        const text = Selector('div').withText(data)
        await t.expect((text).exists).ok()
        log.info("Following Text verified    " + data)
    }

}

export default studentProvideInformationPage