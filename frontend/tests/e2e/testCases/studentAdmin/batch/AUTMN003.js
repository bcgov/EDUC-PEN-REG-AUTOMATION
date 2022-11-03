import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants'
import archivedPenRequestFilesPage from '../../../pageObjects/studentAdmin/batch/archivedPenRequestFilesPage'
import batchFiles from '../../../config/batchData/batchFiles.json'
import batchStatus from '../../../config/batchData/batchStatus.json'
import penRequestDetailsPage from '../../../pageObjects/studentAdmin/batch/penRequestDetailsPage'
import penRequestFilesPage from '../../../pageObjects/studentAdmin/batch/penRequestFilesPage'
import errors from '../../../config/batchData/autmn003.json'

const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const archive = new archivedPenRequestFilesPage()
const penRequest = new penRequestDetailsPage()
const penRequestFiles = new penRequestFilesPage()

fixture`Student Admin - Batch`
    .page(staffLoginUrl)
    .beforeEach(async t => {
      await t.resizeWindow(1920, 1080)
    })

test('AUTMN003', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.clickViewK12Button()

    await penRequestFiles.clickFixCheckbox()

    await penRequestFiles.clickOnSubmissionNumber(batchFiles.batchData.test[2].submissionNumber)

    await penRequestFiles.resizeWindow()

    await penRequestFiles.clickViewDetailsButton()

    await penRequest.verifySchoolName(batchFiles.schoolName[3])

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.verifyIssueNewPenButtonDisabled()

    await penRequest.VerifyFieldNameAndErrorDescription(1, errors['1of10'].fieldName1, errors['1of10'].errorDescription)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(1, errors['2of10'].fieldName1, errors['2of10'].errorDescription)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['3of10'].fieldName1, errors['3of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['3of10'].fieldName2, errors['3of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['3of10'].fieldName3, errors['3of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['3of10'].fieldName4, errors['3of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['3of10'].fieldName5, errors['3of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['3of10'].fieldName6, errors['3of10'].errorDescription)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['4of10'].fieldName1, errors['4of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['4of10'].fieldName2, errors['4of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['4of10'].fieldName3, errors['4of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['4of10'].fieldName4, errors['4of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['4of10'].fieldName5, errors['4of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['4of10'].fieldName6, errors['4of10'].errorDescription)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(4, errors['5of10'].fieldName1, errors['5of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(4, errors['5of10'].fieldName2, errors['5of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(4, errors['5of10'].fieldName3, errors['5of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(4, errors['5of10'].fieldName4, errors['5of10'].errorDescription)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['6of10'].fieldName1, errors['6of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['6of10'].fieldName2, errors['6of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['6of10'].fieldName3, errors['6of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['6of10'].fieldName4, errors['6of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['6of10'].fieldName5, errors['6of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(6, errors['6of10'].fieldName6, errors['6of10'].errorDescription)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(1, errors['7of10'].fieldName1, errors['7of10'].errorDescription)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(1, errors['8of10'].fieldName1, errors['8of10'].errorDescription)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(1, errors['9of10'].fieldName1, errors['9of10'].errorDescription)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(1, errors['10of10'].fieldName1, errors['10of10'].errorDescription)

});