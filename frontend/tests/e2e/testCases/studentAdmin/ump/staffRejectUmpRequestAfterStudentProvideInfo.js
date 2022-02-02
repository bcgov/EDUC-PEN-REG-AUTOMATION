import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import staffUmpRequestsPage from '../../../pageObjects/studentAdmin/ump/staffUmpRequestsPage'
import staffActionOnUmpPage from '../../../pageObjects/studentAdmin/ump/staffActionOnUmpPage'
import { idirAdminCredentials, staffLoginUrl, penNumber} from '../../../config/constants';
import studentData from '../../../config/studentData/studentData.json';
import staffData from '../../../config/staffData/staffData.json'

const staffLogin = new staffLoginPage()
const umpAction = new staffActionOnUmpPage()
const umpPage = new staffUmpRequestsPage()
const dashboard = new staffDashboardPage()

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and Reject Ump Request after student provided information test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials,staffLoginUrl)

    await dashboard.clickViewUmpButton()
    
    await umpPage.setMainStatusBar(staffData.Status[1])

    await umpPage.setPenNumberSearchBar(penNumber)

    await umpPage.clickStatusResultFirstElement(staffData.Status[1],penNumber)

    await umpAction.verifyClaimConformation(staffData.ClaimConformationText)

    await umpAction.verifyUploadedFiles(1,studentData.documentType,studentData.documentName)

    await umpAction.verifyUploadedFiles(2,studentData.documentType,studentData.documentName)

    await umpAction.verifyUploadedFiles(3,studentData.documentType2,studentData.documentName2)

    await umpAction.clickRejectButton()

    await umpAction.setRejectTextBox(staffData.RejectInformation)

    await umpAction.clickRejectPenRequestButton(staffData.Status[4])

    await umpAction.verifyasOfDate()

    await umpAction.verifySubmittedDate()

    await umpAction.actionConfirmationText(idirAdminCredentials.username)

});