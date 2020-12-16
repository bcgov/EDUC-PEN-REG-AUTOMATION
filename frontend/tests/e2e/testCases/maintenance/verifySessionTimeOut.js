import staffLoginPage from '../../pageObjects/login/staffLoginPage'
import { idirAdminCredentials, staffLoginUrl } from '../../config/constants'
import staffHamburgerMenuPage from '../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import createNewPenPage from '../../pageObjects/studentAdmin/createNewPen/createNewPenPage'

const staffLogin = new staffLoginPage()
const menu = new staffHamburgerMenuPage()
const create = new createNewPenPage()


fixture`Staff create New Pen`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff create New Pen test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    await menu.clickHamburgerMenu()

    await menu.clickInfrequentProcessLink()

    await menu.clickCreateNewPenLink()

    await create.verifySessionTimeOut()

})