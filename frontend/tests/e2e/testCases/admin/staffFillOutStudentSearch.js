import staffLoginPage from '../../pageObjects/login/staffLoginPage';
import staffStudentSearchPage from '../../pageObjects/admin/staffStudentSearchPage'
import staffDashboardPage from '../../pageObjects/admin/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl, penNumber } from '../../config/constants';
import studentData from '../../config/studentData.json';


const staffLogin = new staffLoginPage()
const searchPage = new staffStudentSearchPage()
const dashboard = new staffDashboardPage()


fixture`Staff login and search for student`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and search for student test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    await dashboard.clickFullSearchButton()
    
    await searchPage.setPen(penNumber)

    await searchPage.setLegalSurname(studentData.legalFirstName)

});