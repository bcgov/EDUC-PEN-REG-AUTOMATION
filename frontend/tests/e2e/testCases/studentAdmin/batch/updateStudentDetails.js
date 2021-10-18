import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants'
import staffStudentSearchPage from '../../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'
import studentDataK12 from '../../../config/batchData/autmn001.json'
import studentDataPsi from '../../../config/batchData/autmn002.json'

const staffLogin = new staffLoginPage()
const staffSearch = new staffStudentSearchPage()
const dashboard = new staffDashboardPage()

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and update batch student details test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.clickFullSearchButton()

    await staffSearch.searchAndUpdateStudent(studentDataK12.studentData)

    await staffSearch.searchAndUpdateStudent(studentDataPsi.studentData)

})