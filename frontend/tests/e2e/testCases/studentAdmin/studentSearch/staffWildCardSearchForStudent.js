import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl, penNumber} from '../../../config/constants'
import staffStudentSearchPage from '../../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'
import studentSearchResult from '../../../config/studentData/studentSearchResults.json'
import studentData from '../../../config/studentData/studentData.json'

const staffLogin = new staffLoginPage()
const staffSearch = new staffStudentSearchPage()
const dashboard = new staffDashboardPage()


fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and wild card search for student test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials,staffLoginUrl)

    await dashboard.clickFullSearchButton()

    await staffSearch.setLegalSurname(studentData.legalSurnameWildcard)

    await staffSearch.setLegalGiven(studentData.legalGivenWildcard)

    await staffSearch.clickSearchButton()

    await staffSearch.verifyStudentSearchResult(penNumber, studentSearchResult)

});