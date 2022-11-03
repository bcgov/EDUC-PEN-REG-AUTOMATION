import staffLoginPage from '../../pageObjects/login/staffLoginPage'
import { idirAdminCredentials, staffLoginUrl } from '../../config/constants'

const staffLogin = new staffLoginPage()

fixture`Maintenance`
    .page(staffLoginUrl)
    .beforeEach(async t => {
      await t.resizeWindow(1920, 1080)
    })

test('Session Timeout test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials,staffLoginUrl)

    await staffLogin.waitForThirtyTwoMinutes()

    await staffLogin.verifySessionExpired()

    await staffLogin.stafflogin(idirAdminCredentials,staffLoginUrl)

})