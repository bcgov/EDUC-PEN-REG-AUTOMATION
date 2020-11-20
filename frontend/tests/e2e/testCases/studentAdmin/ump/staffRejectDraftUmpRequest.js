import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import staffUmpRequestsPage from '../../../pageObjects/studentAdmin/ump/staffUmpRequestsPage'
import staffActionOnUmpPage from '../../../pageObjects/studentAdmin/ump/staffActionOnUmpPage'
import { idirAdminCredentials, staffLoginUrl, penNumber} from '../../../config/constants';
import staffData from '../../../config/staffData/staffData.json'

const staffLogin = new staffLoginPage()
const umpAction = new staffActionOnUmpPage()
const umpPage = new staffUmpRequestsPage()
const dashboard = new staffDashboardPage()

fixture`Staff login and Reject Draft Ump Request`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and Reject Draft Ump Request test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    await dashboard.clickViewUmpButton()
    
    await umpPage.setMainStatusBar(staffData.Status[5])

    await umpPage.setPenNumberSearchBar(penNumber)

    await umpPage.clickStatusResultFirstElement(staffData.Status[5])

    await umpAction.clickRejectButton()

    await umpAction.setRejectTextBox(staffData.RejectInformation)

    await umpAction.clickRejectPenRequestButton(staffData.Status[4])

    await umpAction.verifyasOfDate()

    await umpAction.verifySubmittedDateEmpty()

    await umpAction.actionConfirmationText(idirAdminCredentials.username)

});