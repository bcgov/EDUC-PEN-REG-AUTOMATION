import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants'
import batchFiles from '../../../config/batchData/batchFiles.json'
import batchStatus from '../../../config/batchData/batchStatus.json'
import penRequestDetailsPage from '../../../pageObjects/studentAdmin/batch/penRequestDetailsPage'
import penRequestFilesPage from '../../../pageObjects/studentAdmin/batch/penRequestFilesPage'

const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const penRequest = new penRequestDetailsPage()
const penRequestFiles = new penRequestFilesPage()

fixture`Student Admin - Batch`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('AUTMN005', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.clickViewK12Button()

    await penRequestFiles.clickFixCheckbox()

    await penRequestFiles.clickOnSubmissionNumber("AUTMN005")

    await penRequestFiles.maximizeWindow()

    await penRequestFiles.clickViewDetailsButton()

    for (let i = 1; i <= 9; i++) {

        await penRequest.verifySchoolName(batchFiles.schoolName[5])

        await penRequest.verifyStatusPill(batchStatus.fixable)

        await penRequest.verifyThreeButtonsAreNotDisabled()

        await penRequest.clickNextRecord()

    }
});