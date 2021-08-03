import staffLoginPage from '../../pageObjects/login/staffLoginPage'
import { idirAdminCredentials, staffLoginUrl, penNumber } from '../../config/constants'
import studentDetailsData from '../../config/studentData/studentDetails.json'
import studentDetailsPage from '../../pageObjects/studentAdmin/studentSearch/studentDetailsPage'
import createNewPenPage from '../../pageObjects/studentAdmin/createNewPen/createNewPenPage'
import staffDashboardPage from '../../pageObjects/studentAdmin/dashboard/staffDashboardPage'

const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const create = new createNewPenPage()
const studentDetails = new studentDetailsPage()

fixture`Maintenance`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Session Timeout test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials,staffLoginUrl)

    await staffLogin.waitForThirtyTwoMinutes()

    await staffLogin.verifySessionExpired()

})