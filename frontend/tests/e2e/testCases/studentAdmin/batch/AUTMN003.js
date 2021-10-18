import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants'
import archivedPenRequestFilesPage from '../../../pageObjects/studentAdmin/batch/archivedPenRequestFilesPage'
import batchFiles from '../../../config/batchData/batchFiles.json'
import batchStatus from '../../../config/batchData/batchStatus.json'
import penRequestDetailsPage from '../../../pageObjects/studentAdmin/batch/penRequestDetailsPage'
import penRequestFilesPage from '../../../pageObjects/studentAdmin/batch/penRequestFilesPage'

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

test('AUTMN003', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.clickViewK12Button()

    await penRequestFiles.clickFixCheckbox()

    await penRequestFiles.clickOnSubmissionNumber("AUTMN003")

    await penRequestFiles.maximizeWindow()

    await penRequestFiles.clickViewDetailsButton()

    await penRequest.verifyTitle(batchStatus.filter[1])

    await penRequest.verifySchoolName(batchFiles.schoolName[1])

    await penRequest.verifyStatusPill(batchStatus.error)

    await penRequest.verifyIssueNewPenButtonDisabled()

});