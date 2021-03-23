import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import staffPenRetrievalRequestPage from '../../../pageObjects/studentAdmin/gmp/staffPenRetrievalRequestsPage'
import staffActionOnPenPage from '../../../pageObjects/studentAdmin/gmp/staffActionOnPenPage'
import { idirAdminCredentials, staffLoginUrl} from '../../../config/constants';
import studentData from '../../../config/studentData/studentData.json';
import staffData from '../../../config/staffData/staffData.json'

const staffLogin = new staffLoginPage()
const penPage = new staffPenRetrievalRequestPage()
const penAction = new staffActionOnPenPage()
const dashboard = new staffDashboardPage()

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and can not perform any action on abandoned Pen Request test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials,staffLoginUrl)

    await dashboard.clickViewGmpButton()

    await penPage.setMainStatusBar(staffData.Status[8])

    await penPage.setLastNameSearchBar(studentData.legalLastName)

    await penPage.setFirstNameSearchBar(studentData.legalFirstName)

    await penPage.clickStatusResultFirstElement(staffData.Status[8],studentData.legalLastName,studentData.legalFirstName)

    await penAction.verifyClaimButtonDisabled()

    await penAction.verifyProvidePenButtonDisabled()

    await penAction.clickRequestInfoButton()

    await penAction.verifyReturnToStudentButtonDisabled()

    await penAction.clickRejectButton()

    await penAction.verifyRejectButtonDisabled()

});