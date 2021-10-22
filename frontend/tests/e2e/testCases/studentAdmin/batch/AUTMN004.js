import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants'
import archivedPenRequestFilesPage from '../../../pageObjects/studentAdmin/batch/archivedPenRequestFilesPage'
import batchFiles from '../../../config/batchData/batchFiles.json'
import batchStatus from '../../../config/batchData/batchStatus.json'
import penRequestDetailsPage from '../../../pageObjects/studentAdmin/batch/penRequestDetailsPage'
import penRequestFilesPage from '../../../pageObjects/studentAdmin/batch/penRequestFilesPage'
import errors from '../../../config/batchData/autmn004.json'

const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const archive = new archivedPenRequestFilesPage()
const penRequest = new penRequestDetailsPage()
const penRequestFiles = new penRequestFilesPage()

fixture`Student Admin - Batch`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('AUTMN004', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.clickViewPsiButton()

    await penRequestFiles.clickFixCheckbox()

    await penRequestFiles.clickOnSubmissionNumber(batchFiles.batchData[3].submissionNumber)

    await penRequestFiles.maximizeWindow()

    await penRequestFiles.clickViewDetailsButton()

    await penRequest.verifySchoolName(batchFiles.schoolName[4])

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

    await penRequest.VerifyFieldNameAndErrorDescription(1, errors['4of10'].fieldName1, errors['4of10'].errorDescription)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(1, errors['5of10'].fieldName1, errors['5of10'].errorDescription)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(4, errors['6of10'].fieldName1, errors['6of10'].errorDescription1)
    await penRequest.VerifyFieldNameAndErrorDescription(4, errors['6of10'].fieldName2, errors['6of10'].errorDescription1)
    await penRequest.VerifyFieldNameAndErrorDescription(4, errors['6of10'].fieldName3, errors['6of10'].errorDescription2)
    await penRequest.VerifyFieldNameAndErrorDescription(4, errors['6of10'].fieldName4, errors['6of10'].errorDescription1)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(2, errors['7of10'].fieldName1, errors['7of10'].errorDescription1)
    await penRequest.VerifyFieldNameAndErrorDescription(2, errors['7of10'].fieldName2, errors['7of10'].errorDescription2)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(2, errors['8of10'].fieldName1, errors['8of10'].errorDescription)
    await penRequest.VerifyFieldNameAndErrorDescription(2, errors['8of10'].fieldName2, errors['8of10'].errorDescription)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(2, errors['9of10'].fieldName1, errors['9of10'].errorDescription1)
    await penRequest.VerifyFieldNameAndErrorDescription(2, errors['9of10'].fieldName2, errors['9of10'].errorDescription2)

    await penRequest.clickNextRecord()

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.VerifyFieldNameAndErrorDescription(1, errors['10of10'].fieldName1, errors['10of10'].errorDescription)

});