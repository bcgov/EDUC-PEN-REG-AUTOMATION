import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import constants from '../../../config/constants'
import staffStudentSearchPage from '../../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'
import studentDetailsPage from '../../../pageObjects/studentAdmin/studentSearch/studentDetailsPage'
import studentData from '../../../config/studentData/twinAndMergeStudentData.json'

const staffLogin = new staffLoginPage()
const staffSearch = new staffStudentSearchPage()
const dashboard = new staffDashboardPage()
const studentDetails = new studentDetailsPage()

fixture`Student Admin`
    .page(constants.staffLoginUrl)
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080)
    })

test('Staff login and verify twin record  test', async t => {

    await staffLogin.stafflogin(constants.idirAdminCredentials,constants.staffLoginUrl)

    await dashboard.setPenNumber(constants.twinOnePen)

    await dashboard.clickQuickSearchButton()

    await studentDetails.verifyLegalNames(studentData.data[0])

    await studentDetails.clickOnTwinRecordYes()

    await studentDetails.verifyTwinsNumber("1 Twins")

    await studentDetails.clickOnTableCell(constants.twinTwoPen)

    await dashboard.resizeWindow()

    await studentDetails.verifyLegalNames(studentData.data[1])

    await studentDetails.clickOnTwinRecordYes()

    await studentDetails.verifyTwinsNumber("1 Twins")

    await studentDetails.clickOnTableCell(constants.twinOnePen)

    await dashboard.resizeWindow()

    await studentDetails.verifyLegalNames(studentData.data[0])

});