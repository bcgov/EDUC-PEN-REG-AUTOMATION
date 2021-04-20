import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import constants from '../../../config/constants'
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import comparePenNumbersPage from '../../../pageObjects/studentAdmin/comparePens/comparePenNumbersPage'
import staffData from '../../../config/staffData/staffData.json'
import studentData from '../../../config/studentData/twinAndMergeStudentData.json'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import studentDetailsPage from '../../../pageObjects/studentAdmin/studentSearch/studentDetailsPage'



const staffLogin = new staffLoginPage()
const menu = new staffHamburgerMenuPage()
const compare = new comparePenNumbersPage()
const dashboard = new staffDashboardPage()
const studentDetails = new studentDetailsPage()


fixture`Student Admin`
    .page(constants.staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff Merge Two students and verify messages test', async t => {

    await staffLogin.stafflogin(constants.idirAdminCredentials, constants.staffLoginUrl)

    await menu.clickHamburgerMenu()

    await menu.clickComparePensLink()

    await compare.setPenNumber(constants.mergeOnePen)

    await compare.clickAddPenButton()

    await compare.setPenNumber(constants.mergeTwoPen)

    await compare.clickAddPenButton()

    await compare.selectStudentRecord(4)

    await compare.selectStudentRecord(5)

    await compare.clickMergePensButton()

    await studentDetails.setMemo(staffData.MergeMemo)

    await compare.clickMergeButton()

    await compare.clickPopUpYesButton()

    // await compare.verifyMessage(staffData.MergeSuccessMessage)

    // await studentDetails.verifyLegalNames(studentData.data[3])

    // await menu.clickHamburgerMenu()

    // await menu.clickDashboardLink()

    // await dashboard.setPenNumber(constants.mergeOnePen)

    // await dashboard.clickQuickSearchButton()

    await studentDetails.verifyLegalNames(studentData.data[3])

    await studentDetails.verifyMemo(staffData.MergeMemo)

    await studentDetails.clickOnMergedFromToData(constants.mergeTwoPen)

    await studentDetails.verifyLegalNames(studentData.data[4])

    await studentDetails.clickOnMergedFromToData(constants.mergeOnePen)

    await studentDetails.verifyLegalNames(studentData.data[3])
})