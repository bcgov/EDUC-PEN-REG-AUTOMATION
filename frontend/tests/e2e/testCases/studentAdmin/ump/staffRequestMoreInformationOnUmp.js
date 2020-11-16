import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/admin/staffDashboardPage'
import staffUmpRequestsPage from '../../../pageObjects/admin/staffUmpRequestsPage'
import staffActionOnUmpPage from '../../../pageObjects/admin/staffActionOnUmpPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants'
import studentData from '../../../config/studentData/studentData.json';
import staffData from '../../../config/staffData/staffData.json'

const staffLogin = new staffLoginPage()
const umpPage = new staffUmpRequestsPage()
const umpAction = new staffActionOnUmpPage()
const dashboard = new staffDashboardPage()


fixture`Staff login and request more information from student on Ump request`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and request more information from student on Ump request test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    await dashboard.clickViewUmpButton()

    await umpPage.setMainStatusBar(staffData.Status[0])

    await umpPage.setLastNameSearchBar(studentData.legalLastName)

    await umpPage.clickStatusResultFirstElement(staffData.Status[0])

    await umpAction.clickClaimButton()

    await umpAction.verifyClaimConformation(staffData.ClaimConformationText)

    await umpAction.clickRequestInfoButton()

    await umpAction.setRequestInfoTextBox(staffData.RequestInformation)

    await umpAction.clickReturnToStudentButton(staffData.Status[6])

});