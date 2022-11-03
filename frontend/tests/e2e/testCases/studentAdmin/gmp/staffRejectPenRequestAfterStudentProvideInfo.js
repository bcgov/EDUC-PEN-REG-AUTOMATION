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
        await t.resizeWindow(1920, 1080)
    })

test('Staff login and Reject Pen Request after student provided information', async t => {

    await staffLogin.stafflogin(idirAdminCredentials,staffLoginUrl)

    await dashboard.clickViewGmpButton()

    await penPage.setMainStatusBar(staffData.Status[1])

    await penPage.setLastNameSearchBar(studentData.legalLastName)

    await penPage.setFirstNameSearchBar(studentData.legalFirstName)

    await penPage.clickStatusResultFirstElement(staffData.Status[1],studentData.legalLastName,studentData.legalFirstName)

    await penAction.verifyClaimConformation(staffData.ClaimConformationText)

    await penAction.verifyUploadedFiles(1, studentData.documentType,studentData.documentName)

    await penAction.verifyUploadedFiles(2, studentData.documentType2,studentData.documentName2)

    await penAction.clickRejectButton()

    await penAction.setRejectTextBox(staffData.RejectInformation)

    await penAction.clickRejectPenRequestButton(staffData.Status[4])

    await penAction.verifyasOfDate()

    await penAction.verifySubmittedDate()

    await penAction.actionConfirmationText(idirAdminCredentials.username)
});