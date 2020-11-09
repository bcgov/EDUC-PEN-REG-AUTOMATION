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

fixture`Staff login and can not perform any action on abandoned Pen Request`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
        await t.setTestSpeed(0.5)
    })

test('Staff login and can not perform any action on abandoned Pen Request test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    await dashboard.clickViewGmpButton()

    await penPage.setMainStatusBar(staffData.Status[8])

    await penPage.setLastNameSearchBar(studentData.legalLastName)

    await penPage.setFirstNameSearchBar(studentData.legalFirstName)

    await penPage.clickStatusResultFirstElement()

    await penAction.verifyClaimButtonDisabled()

    await penAction.verifyProvidePenButtonDisabled()

    await penAction.clickRequestInfoButton()

    await penAction.verifyReturnToStudentButtonDisabled()

    await penAction.clickRejectButton()

    await penAction.verifyRejectButtonDisabled()

});