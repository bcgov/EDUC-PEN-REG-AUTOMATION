import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffDashboardPage from '../../../pageObjects/admin/staffDashboardPage'
import staffPenRetrievalRequestPage from '../../../pageObjects/admin/staffPenRetrievalRequestsPage'
import staffActionOnPenPage from '../../../pageObjects/admin/staffActionOnPenPage'
import { idirAdminCredentials, staffLoginUrl} from '../../../config/constants';
import studentData from '../../../config/studentData/studentData.json';
import staffData from '../../../config/staffData/staffData.json'

const staffLogin = new staffLoginPage()
const penPage = new staffPenRetrievalRequestPage()
const penAction = new staffActionOnPenPage()
const dashboard = new staffDashboardPage()

fixture`Staff login and Reject Pen Request`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and Reject Pen Request test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    await dashboard.clickViewGmpButton()

    await penPage.setMainStatusBar(staffData.Status[0])

    await penPage.setLastNameSearchBar(studentData.legalLastName)

    await penPage.setFirstNameSearchBar(studentData.legalFirstName)

    await penPage.clickStatusResultFirstElement(staffData.Status[0])

    await penAction.clickClaimButton()

    await penAction.verifyClaimConformation(staffData.ClaimConformationText)

    await penAction.clickRejectButton()

    await penAction.setRejectTextBox(staffData.RejectInformation)

    await penAction.clickRejectPenRequestButton(staffData.Status[4])

    await penAction.verifyasOfDate()

    await penAction.verifySubmittedDate()

    await penAction.actionConfirmationText(idirAdminCredentials.username)

});