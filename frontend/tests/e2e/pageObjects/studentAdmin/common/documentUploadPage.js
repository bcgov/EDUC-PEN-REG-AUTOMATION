import { Selector, t } from 'testcafe';
const log = require('npmlog');

class DocumentUploadPage {
  constructor() {

    //buttons
    this.uploadFormButton = Selector('#upload_form');
    this.closeFormButton = Selector('#cancelUploadButton');

    //inputs
    this.selectFile = Selector('#selectFileInput');

    //response fields
    this.uploadAlert = Selector('.v-messages__message');
  }

  async clickUploadButton() {
    await t.click(this.uploadFormButton);
    log.info("Upload button is clicked");
  }

  async clickCancelButton() {
    await t.click(this.closeFormButton);
    log.info("Cancel button is clicked");
  }

  async uploadDocument(data) {
    await t.setFilesToUpload((this.selectFile), [data]);
    log.info('File uploaded');
  }

  async verifyMaxFileSizeError() {
    await t.expect(this.uploadAlert.innerText).eql("File size should not be larger than 10 MB!");
    log.info('File size should not be larger than 10 MB! text verified');
  }
}

export default DocumentUploadPage