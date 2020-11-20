import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl, penNumber} from '../../../config/constants'
import staffStudentSearchPage from '../../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'
import studentSearchResult from '../../../config/studentData/studentSearchResults.json'
import studentData from '../../../config/studentData/studentData.json'

const staffLogin = new staffLoginPage()
const staffSearch = new staffStudentSearchPage()
const dashboard = new staffDashboardPage()


fixture`Staff login and do advanced search for student`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and do advanced search for student test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    await dashboard.clickFullSearchButton()

    await staffSearch.clickAdvanceSearchButton()

    //await staffSearch.setPen(penNumber)

    await staffSearch.setLegalSurname(studentData.legalLastName)

    await staffSearch.setLegalGiven(studentData.legalFirstName)

    await staffSearch.setLegalMiddle(studentData.legalMiddleNames)
    
    await staffSearch.setDobRange(studentData)

    await staffSearch.clickSearchButton()
    
    await staffSearch.verifyStudentSearchResult(penNumber, studentSearchResult)

    await staffSearch.verifyClearButtonAction()

    await staffSearch.verifyStudentSearchResult(penNumber, studentSearchResult)

});