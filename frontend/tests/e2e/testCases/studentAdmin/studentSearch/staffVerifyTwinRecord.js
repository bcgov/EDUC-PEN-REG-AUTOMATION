import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/admin/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl, penMerged} from '../../../config/constants'
import staffStudentSearchPage from '../../../pageObjects/admin/staffStudentSearchPage'
import studentDetailsPage from '../../../pageObjects/admin/studentDetailsPage'

const staffLogin = new staffLoginPage()
const staffSearch = new staffStudentSearchPage()
const dashboard = new staffDashboardPage()
const studentDetails = new studentDetailsPage()

fixture`Staff login and verify twin record`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and verify twin record  test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    await dashboard.setPenNumber(penMerged)

    await dashboard.clickQuickSearchButton()

    await studentDetails.clickOnTwinRecordYes()

    await studentDetails.verifyTwinsNumber("2 Twins")

});