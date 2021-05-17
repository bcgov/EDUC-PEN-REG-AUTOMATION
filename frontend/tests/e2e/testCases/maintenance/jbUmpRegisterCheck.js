import staffLoginPage from '../../pageObjects/login/staffLoginPage'
import constants from '../../config/constants'
import journeyBuilderPage from '../../pageObjects/login/journeyBuilderPage'
import staffDashboardPage from '../../pageObjects/studentAdmin/dashboard/staffDashboardPage'

const staffLogin = new staffLoginPage()
const journey = new journeyBuilderPage()
const dashboard = new staffDashboardPage()

fixture`Maintenance`
    .page(constants.JB.jbUmpPage)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Verify Journey builder page navigation links test', async t => {

    await staffLogin.jbPageIdirLogin(constants.idirAdminCredentials)

    await journey.clikcRegisterButton()

    await dashboard.maximizeWindow()

    await journey.verifyUrl(constants.JB.jbRegisterPage)

});