import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl, penStudentHistory } from '../../../config/constants'
import studentData from '../../../config/studentData/insertStudentForHistoryData.json'
import studentDetailsPage from '../../../pageObjects/studentAdmin/studentSearch/studentDetailsPage'
import studentAuditHistoryDetailsPage from '../../../pageObjects/studentAdmin/studentSearch/studentAuditHistoryDetailsPage'


const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const studentDetails = new studentDetailsPage()
const audit = new studentAuditHistoryDetailsPage()

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login search update and reset student info test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials,staffLoginUrl)

    await dashboard.setPenNumber(penStudentHistory)

    await dashboard.clickQuickSearchButton()

    await studentDetails.clickCompareModelButton()

    await studentDetails.verifyUsualNameNotDisplayedOnCompareModel()

    await studentDetails.clickCompareModelCancelButton()

    await studentDetails.clickAuditHistoryTab()

    await audit.clickOnAuditRecord("STUDENT-API")

    await audit.verifyRevertButtonDisabled()

    await studentDetails.clickDemographicsTab()

    await studentDetails.setUsualSurname(studentData.updates.usualLastName)

    await studentDetails.setUsualGiven(studentData.updates.usualFirstName)

    await studentDetails.setUsualMiddle(studentData.updates.usualMiddleNames)

    await studentDetails.clickSaveButton()

    await studentDetails.clickAuditHistoryTab()

    await studentDetails.clickDemographicsTab()

    await studentDetails.clickCompareModelButton()

    await studentDetails.verifyUsualNameDisplayedOnCompareModel(studentData)

    await studentDetails.clickCompareModelCancelButton()

    await studentDetails.clickAuditHistoryTab()

    await audit.clickOnAuditRecord(idirAdminCredentials.username)

    await audit.verifyStudentInformationUpdated(studentData.updates)

    await audit.clickOnAuditRecord("STUDENT-API") 

    await audit.clickRevertButton()

    await audit.clickPopupConfirmButton()

    await audit.clickOnAuditRecord(idirAdminCredentials.username)

    await audit.verifyStudentInformationReverted(studentData)

    await studentDetails.clickDemographicsTab()

    await studentDetails.clickCompareModelButton()

    await studentDetails.verifyUsualNameNotDisplayedOnCompareModel()
   
});