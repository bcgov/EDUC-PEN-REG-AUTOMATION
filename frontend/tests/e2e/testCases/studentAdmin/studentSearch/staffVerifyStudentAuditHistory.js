import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl, penNumber } from '../../../config/constants'
import studentDetailsData from '../../../config/studentData/studentDetails.json'
import studentDetailsPage from '../../../pageObjects/studentAdmin/studentSearch/studentDetailsPage'


const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const studentDetails = new studentDetailsPage()

fixture`Staff login search update and reset student info`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login search update and reset student info test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    await dashboard.setPenNumber(penNumber)

    await dashboard.clickQuickSearchButton()

    await studentDetails.verifyStudentDetails(penNumber, studentDetailsData)

    await studentDetails.clickAuditHistoryTab()

});