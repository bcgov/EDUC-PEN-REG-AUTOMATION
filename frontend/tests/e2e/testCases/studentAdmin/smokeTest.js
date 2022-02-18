import staffLoginPage from '../../pageObjects/login/staffLoginPage';
import staffDashboardPage from '../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import staffPenRetrievalRequestPage from '../../pageObjects/studentAdmin/gmp/staffPenRetrievalRequestsPage'
import { idirAdminCredentials, staffLoginUrl, penNumber } from '../../config/constants';
import studentSearchResult from '../../config/studentData/studentSearchResults.json'
import staffData from '../../config/staffData/staffData.json'
import staffHamburgerMenuPage from '../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import staffUmpRequestsPage from '../../pageObjects/studentAdmin/ump/staffUmpRequestsPage'
import staffStudentSearchPage from '../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'

const staffLogin = new staffLoginPage()
const penPage = new staffPenRetrievalRequestPage()
const dashboard = new staffDashboardPage()
const menu = new staffHamburgerMenuPage()
const umpPage = new staffUmpRequestsPage()
const staffSearch = new staffStudentSearchPage()

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Smoke test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.clickViewGmpButton()

    await penPage.setMainStatusBar(staffData.Status[0])

    await menu.clickHamburgerMenu()

    await menu.clickDashboardLink()

    await dashboard.clickViewUmpButton()

    await umpPage.setMainStatusBar(staffData.Status[0])

    await menu.clickHamburgerMenu()

    await menu.clickDashboardLink()

    await dashboard.clickFullSearchButton()

    await staffSearch.setPen(penNumber)

    await staffSearch.verifyStudentSearchResult(penNumber, studentSearchResult)

});
