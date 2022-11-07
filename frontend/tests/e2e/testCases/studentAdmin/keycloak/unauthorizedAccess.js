import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirUnauthorizedCredentials, staffLoginUrl } from '../../../config/constants'


const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()


fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080)
    })

test('Verify Unauthorized Access test', async t => {

    await staffLogin.staffUnauthorizedlogin(idirUnauthorizedCredentials, staffLoginUrl)

    await dashboard.verifyUnauthorizedErrorText()

    await dashboard.verifyUnauthorizedErrorMessage()

});