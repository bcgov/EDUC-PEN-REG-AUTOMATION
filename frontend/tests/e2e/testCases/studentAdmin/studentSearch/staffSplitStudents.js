import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl, penSplit } from '../../../config/constants'
import studentData from '../../../config/studentData/insertStudentForSplit.json'
import studentDetailsPage from '../../../pageObjects/studentAdmin/studentSearch/studentDetailsPage'
import studentAuditHistoryDetailsPage from '../../../pageObjects/studentAdmin/studentSearch/studentAuditHistoryDetailsPage'

const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const studentDetails = new studentDetailsPage()
const audit = new studentAuditHistoryDetailsPage()


fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080)
    })

test('Staff login, search and split students test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.setPenNumber(penSplit)

    await dashboard.clickQuickSearchButton()

    await studentDetails.clickAuditHistoryTab()

    await audit.clickOnAuditRecord("STUDENT-API")

    await audit.verifySplitPenButtonDisabled()

    await studentDetails.clickDemographicsTab()

    await studentDetails.setLegalSurname(studentData.updates.legalLastName)

    await studentDetails.setLegalGiven(studentData.updates.legalFirstName)

    await studentDetails.setLegalMiddle(studentData.updates.legalMiddleNames)

    await studentDetails.setUsualSurname(studentData.updates.usualLastName)

    await studentDetails.setUsualGiven(studentData.updates.usualFirstName)

    await studentDetails.setUsualMiddle(studentData.updates.usualMiddleNames)

    await studentDetails.clickSaveButton()

    await studentDetails.verifyLegalNames(studentData.updates)

    await studentDetails.clickAuditHistoryTab()

    await audit.clickOnAuditRecord(idirAdminCredentials.username)

    await audit.clickSplitPenButton()

    await audit.verifyCurrentLegalLastName(studentData.updates.legalLastName)

    await audit.splitModelRevertCheckBox()

    await audit.verifyCurrentLegalLastName(studentData.data.legalLastName)

    await audit.clickAcceptSplitPenButton()

    await dashboard.resizeWindow()

    await studentDetails.verifyLegalNames(studentData.updates)

    await studentDetails.clickOnTwinRecordYes()

    await studentDetails.verifyTwinsNumber("1 Twins")

    await studentDetails.clickOnTableCell(penSplit)

    // await studentDetails.verifyLegalNames(studentData.data)

});