import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import constants from '../../../config/constants'
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import comparePenNumbersPage from '../../../pageObjects/studentAdmin/comparePens/comparePenNumbersPage'

const staffLogin = new staffLoginPage()
const menu = new staffHamburgerMenuPage()
const compare = new comparePenNumbersPage()


fixture`Student Admin`
    .page(constants.staffLoginUrl)
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080)
    })

test('Staff Verify Three students can not be twinned test', async t => {

    await staffLogin.stafflogin(constants.idirAdminCredentials,constants.staffLoginUrl)

    await menu.clickHamburgerMenu()

    await menu.clickComparePensLink()

    await compare.setPenNumber(constants.twinOnePen)

    await compare.clickAddPenButton()

    await compare.setPenNumber(constants.twinTwoPen)

    await compare.clickAddPenButton()

    await compare.setPenNumber(constants.twinThreePen)

    await compare.clickAddPenButton()

    await compare.selectStudentRecord(3)

    await compare.selectStudentRecord(4)

    await compare.selectStudentRecord(5)

    await compare.verifyTwinButtonDisabled()

    await compare.verifyMergeButtonDisabled()

    await compare.verifyDemergeButtonDisabled()

    await compare.clickClearButton()
})