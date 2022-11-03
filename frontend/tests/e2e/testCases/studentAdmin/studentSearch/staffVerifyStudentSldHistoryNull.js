import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl} from '../../../config/constants'
import studentData from '../../../config/studentData/insertStudentForHistoryData.json'
import studentDetailsPage from '../../../pageObjects/studentAdmin/studentSearch/studentDetailsPage'
import staffStudentSearchPage from '../../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'
import studentSldHistoryPage from '../../../pageObjects/studentAdmin/studentSearch/studentSldHistoryPage'


const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const studentDetails = new studentDetailsPage()
const staffSearch = new staffStudentSearchPage()
const sld = new studentSldHistoryPage()

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080)
    })

test('Staff login and verify no SLD record present test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.clickFullSearchButton()

    await staffSearch.setLegalGiven(studentData.sld.legalFirstName)

    await staffSearch.setDobYear(studentData.sld.dobYear2)

    await staffSearch.clickSearchButton()

    await staffSearch.clickOnFirstSearchResult()

    await dashboard.resizeWindow()

    await studentDetails.clickSldHistoryTabLink()

    await sld.verifySldHistoryTableIsNull()

});