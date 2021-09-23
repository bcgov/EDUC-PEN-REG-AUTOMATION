import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants'
import archivedPenRequestFilesPage from '../../../pageObjects/studentAdmin/batch/archivedPenRequestFilesPage'
import batchFiles from '../../../config/batchData/batchFiles.json'

const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const archive = new archivedPenRequestFilesPage()

fixture`Student Admin - Batch`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('AUTMN002', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.clickAdvancedArchiveSearch()

    await archive.setSubmissionNumber(batchFiles.batchData[1].submissionNumber)

    await archive.clickSearchButton()

    await archive.clickCheckBox()

    await archive.clickViewButton()

    await archive.clickViewList()

});