import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import staffPenRetrievalRequestPage from '../../../pageObjects/studentAdmin/gmp/staffPenRetrievalRequestsPage'
import staffActionOnPenPage from '../../../pageObjects/studentAdmin/gmp/staffActionOnPenPage'
import { idirAdminCredentials, staffLoginUrl, penNumber, pen_environment } from '../../../config/constants';
import studentData from '../../../config/studentData/studentData.json';
import staffData from '../../../config/staffData/staffData.json'
import staffStudentSearchPage from '../../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'
import studentSearchResult from '../../../config/studentData/studentSearchResults.json'

const staffLogin = new staffLoginPage()
const penPage = new staffPenRetrievalRequestPage()
const penAction = new staffActionOnPenPage()
const dashboard = new staffDashboardPage()
const staffSearch = new staffStudentSearchPage()

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and search pen request data', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.clickViewGmpButton()

    await penPage.setMainStatusBar(staffData.Status[0])

    await penPage.setLastNameSearchBar(studentData.legalLastName)

    await penPage.setFirstNameSearchBar(studentData.legalFirstName)

    await penPage.clickStatusResultFirstElement(staffData.Status[0], studentData.legalLastName, studentData.legalFirstName)

    await penAction.clickSearchButton()

    await dashboard.maximizeWindow()

    await staffSearch.verifyStudentSearchResult(penNumber, studentSearchResult)

});
