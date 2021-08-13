import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffUmpRequestsPage from '../../../pageObjects/studentAdmin/ump/staffUmpRequestsPage'
import staffActionOnUmpPage from '../../../pageObjects/studentAdmin/ump/staffActionOnUmpPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl, penNumber, pen_environment } from '../../../config/constants';
import staffData from '../../../config/staffData/staffData.json'
import penDemographics from '../../../config/staffData/penDemographics.json'

const staffLogin = new staffLoginPage()
const umpPage = new staffUmpRequestsPage()
const umpAction = new staffActionOnUmpPage()
const dashboard = new staffDashboardPage()

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and complete Ump request test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials,staffLoginUrl)

    await dashboard.clickViewUmpButton()

    await umpPage.setMainStatusBar(staffData.Status[0])

    await umpPage.setPenNumberSearchBar(penNumber)

    await umpPage.clickStatusResultFirstElement(staffData.Status[0],penNumber)

    await umpAction.clickClaimButton()

    await umpAction.verifyClaimConformation(staffData.ClaimConformationText)

    await umpAction.clickRefreshStudentInfoButton()

    await umpAction.setCompleteComment(staffData.CompleteComment)

    await umpAction.clickSendChangesToStudentButton()

    await umpAction.confirmSubmission(staffData.Status[7])

    await umpAction.verifyasOfDate()

    await umpAction.verifySubmittedDate()

    await umpAction.actionConfirmationText(idirAdminCredentials.username)

    await umpAction.verifyPenDemographics(penNumber, penDemographics)

});
