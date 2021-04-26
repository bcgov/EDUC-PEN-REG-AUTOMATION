import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import constants from '../../../config/constants'
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import comparePenNumbersPage from '../../../pageObjects/studentAdmin/comparePens/comparePenNumbersPage'
import staffData from '../../../config/staffData/staffData.json'

const staffLogin = new staffLoginPage()
const menu = new staffHamburgerMenuPage()
const compare = new comparePenNumbersPage()


fixture`Student Admin`
    .page(constants.staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff Twin Two students and verify messages test', async t => {

    await staffLogin.stafflogin(constants.idirAdminCredentials,constants.staffLoginUrl)

    await menu.clickHamburgerMenu()

    await menu.clickComparePensLink()

    await compare.setPenNumber(constants.twinOnePen)

    await compare.clickAddPenButton()

    await compare.setPenNumber(constants.twinTwoPen)

    await compare.clickAddPenButton()

    await compare.selectStudentRecord(3)

    await compare.selectStudentRecord(4)

    await compare.clickTwinButton()

    await compare.verifyMessage(staffData.TwinSuccessMessage)

    await compare.clickTwinButton()

    await compare.verifyMessage(staffData.TwinFailureMessage)

})