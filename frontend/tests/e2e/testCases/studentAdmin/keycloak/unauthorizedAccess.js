import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants'


const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()


fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Verify Unauthorized Access test', async t => {

    await staffLogin.staffUnauthorizedlogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.verifyUnauthorizedErrorText()

    await dashboard.verifyUnauthorizedErrorMessage()

});