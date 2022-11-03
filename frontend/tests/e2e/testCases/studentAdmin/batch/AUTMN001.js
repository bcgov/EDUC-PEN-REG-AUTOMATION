import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants'
import archivedPenRequestFilesPage from '../../../pageObjects/studentAdmin/batch/archivedPenRequestFilesPage'
import batchFiles from '../../../config/batchData/batchFiles.json'
import batchStatus from '../../../config/batchData/batchStatus.json'
import penRequestDetailsPage from '../../../pageObjects/studentAdmin/batch/penRequestDetailsPage'
import staffStudentSearchPage from '../../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'
const staffSearch = new staffStudentSearchPage()


const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const archive = new archivedPenRequestFilesPage()
const penRequest = new penRequestDetailsPage()

fixture`Student Admin - Batch`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080)
    })

test('AUTMN001', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await staffSearch.waitFor14Minutes()

    await dashboard.clickAdvancedArchiveSearch()

    await archive.setSubmissionNumber(batchFiles.batchData.test[0].submissionNumber)

    await archive.clickSearchButton()

    await archive.clickCheckBox()

    await archive.clickViewButton()

    await archive.clickViewList()

    await archive.clickViewDetailsButton()

    await penRequest.verifyTitle(batchStatus.filter[1])

    await penRequest.verifySchoolName(batchFiles.schoolName[1])

    await penRequest.verifyStatusPill(batchStatus.sysMatch)

    await penRequest.verifyThreeButtonsAreDisabled()

    await penRequest.clickNextRecord()

    await penRequest.verifyTitle(batchStatus.filter[2])

    await penRequest.verifySchoolName(batchFiles.schoolName[1])

    await penRequest.verifyStatusPill(batchStatus.sysMatch)

    await penRequest.verifyThreeButtonsAreDisabled()

    await penRequest.clickNextRecord()
    
    await penRequest.verifyTitle(batchStatus.filter[3])

    await penRequest.verifySchoolName(batchFiles.schoolName[1])

    await penRequest.verifyStatusPill(batchStatus.sysMatch)

    await penRequest.verifyThreeButtonsAreDisabled()

    await penRequest.clickNextRecord()

    await penRequest.verifyTitle(batchStatus.filter[4])

    await penRequest.verifySchoolName(batchFiles.schoolName[1])

    await penRequest.verifyStatusPill(batchStatus.sysMatch)

    await penRequest.verifyThreeButtonsAreDisabled()

    await penRequest.clickNextRecord()

    await penRequest.verifyTitle(batchStatus.filter[5])

    await penRequest.verifySchoolName(batchFiles.schoolName[1])

    await penRequest.verifyStatusPill(batchStatus.sysMatch)

    await penRequest.verifyThreeButtonsAreDisabled()

});