import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import constants from '../../../config/constants'
import studentData from '../../../config/studentData/twinAndMergeStudentData.json'
import studentDetailsPage from '../../../pageObjects/studentAdmin/studentSearch/studentDetailsPage'
import comparePenNumbersPage from '../../../pageObjects/studentAdmin/comparePens/comparePenNumbersPage'
import staffData from '../../../config/staffData/staffData.json'



const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const studentDetails = new studentDetailsPage()
const compare = new comparePenNumbersPage()



fixture`Staff verify twin records after demerge`
    .page(constants.staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff verify twin records after demerge', async t => {

    await staffLogin.stafflogin(constants.idirAdminCredentials)

    await dashboard.setPenNumber(constants.mergeOnePen)

    await dashboard.clickQuickSearchButton()

    await studentDetails.verifyLegalNames(studentData.data[3])

    await studentDetails.clickOnTwinRecordYes()

    await studentDetails.verifyTwinsNumber("1 Twins")

    await studentDetails.clickOnTableCell(constants.mergeTwoPen)

    await dashboard.maximizeWindow()

    await studentDetails.verifyLegalNames(studentData.data[4])

    await studentDetails.clickOnTwinRecordYes()

    await studentDetails.verifyTwinsNumber("1 Twins")

    await studentDetails.clickOnTableCell(constants.mergeOnePen)

    await dashboard.maximizeWindow()

    await studentDetails.verifyLegalNames(studentData.data[3])

});