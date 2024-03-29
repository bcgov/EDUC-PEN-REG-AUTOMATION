import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import { idirAdminCredentials, penNumber, penMerged, staffLoginUrl } from '../../../config/constants'
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import studentData from '../../../config/studentData/createNewPenData.json'
import comparePenNumbersPage from '../../../pageObjects/studentAdmin/comparePens/comparePenNumbersPage'

const staffLogin = new staffLoginPage()
const menu = new staffHamburgerMenuPage()
const compare = new comparePenNumbersPage()


fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080)
    })

test('Staff compare Pen test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials,staffLoginUrl)

    await menu.clickHamburgerMenu()

    await menu.clickComparePensLink()

    await compare.setPenNumber(penNumber)

    await compare.clickAddPenButton()

    await compare.setPenNumber(penMerged)

    await compare.clickAddPenButton()

    await compare.clickRemovePenLink()

    await compare.clickClearButton()
})