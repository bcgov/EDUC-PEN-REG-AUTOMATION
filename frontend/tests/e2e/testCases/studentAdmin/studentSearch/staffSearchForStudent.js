import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/admin/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl, penNumber} from '../../../config/constants'
import staffStudentSearchPage from '../../../pageObjects/admin/staffStudentSearchPage'
import studentSearchResult from '../../../config/studentData/studentSearchResults.json'

const staffLogin = new staffLoginPage()
const staffSearch = new staffStudentSearchPage()
const dashboard = new staffDashboardPage()


fixture`Staff login search for student`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login search for student test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    await dashboard.clickFullSearchButton()

    await staffSearch.setPen(penNumber)

    await staffSearch.verifyStudentSearchResult(penNumber, studentSearchResult)

});