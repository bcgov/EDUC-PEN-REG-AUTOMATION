import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import staffPenRetrievalRequestPage from '../../../pageObjects/studentAdmin/gmp/staffPenRetrievalRequestsPage'
import staffActionOnPenPage from '../../../pageObjects/studentAdmin/gmp/staffActionOnPenPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants';
import studentData from '../../../config/studentData/studentData.json';
import staffData from '../../../config/staffData/staffData.json'

const staffLogin = new staffLoginPage()
const penPage = new staffPenRetrievalRequestPage()
const penAction = new staffActionOnPenPage()
const dashboard = new staffDashboardPage()

fixture`Staff login and can not request more information/issue Pen  but can reject Draft request`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and can not request more information/issue Pen  but can reject Draft request test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    await dashboard.clickViewGmpButton()

    await penPage.setMainStatusBar(staffData.Status[5])

    await penPage.setLastNameSearchBar(studentData.legalLastName)

    await penPage.setFirstNameSearchBar(studentData.legalFirstName)

    await penPage.clickStatusResultFirstElement(staffData.Status[5])

    await penAction.verifyClaimButtonDisabled()

    await penAction.clickProvidePenButton()

    await penAction.verifyProvidePenButtonDisabled()

    await penAction.clickRequestInfoButton()

    await penAction.verifyReturnToStudentButtonDisabled()

    await penAction.verifyasOfDate()

    await penAction.verifySubmittedDateEmpty()

    await penAction.clickRejectButton()

    await penAction.setRejectTextBox(staffData.RejectInformation)

    await penAction.clickRejectPenRequestButton(staffData.Status[4])

    await penAction.actionConfirmationText(idirAdminCredentials.username)

    await penAction.verifyasOfDate()

    await penAction.verifySubmittedDateEmpty()


});