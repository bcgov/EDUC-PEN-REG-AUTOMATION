import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants'
import archivedPenRequestFilesPage from '../../../pageObjects/studentAdmin/batch/archivedPenRequestFilesPage'
import batchFiles from '../../../config/batchData/batchFiles.json'
import batchStatus from '../../../config/batchData/batchStatus.json'
import penRequestDetailsPage from '../../../pageObjects/studentAdmin/batch/penRequestDetailsPage'
import studentData from '../../../config/batchData/autmn007.json'


const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const archive = new archivedPenRequestFilesPage()
const penRequest = new penRequestDetailsPage()

fixture`Student Admin - Batch`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('AUTMN007', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.clickAdvancedArchiveSearch()

    await archive.setSubmissionNumber(batchFiles.batchData.test[6].submissionNumber)

    await archive.clickSearchButton()

    await archive.clickCheckBox()

    await archive.clickViewButton()

    await archive.clickViewList()

    await archive.clickViewDetailsButton()

    for (let i = 0; i <= studentData.studentData.length-1; i++) {

        await penRequest.verifySchoolName(batchFiles.schoolName[7])

        await penRequest.verifyStatusPill(batchStatus.systemNewPen)

        await penRequest.verifyThreeButtonsAreDisabled()

        await penRequest.verifyLegalAndUsualNamesInTable1(studentData.studentData[i].beforeScrub)

        await penRequest.verifyLegalAndUsualNamesInTable2(studentData.studentData[i].afterScrub)

        if (i != 9) {

            await penRequest.clickNextRecord()

        }
    }
});