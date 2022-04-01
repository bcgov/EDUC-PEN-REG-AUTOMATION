import staffLoginPage from '../../../../pageObjects/login/staffLoginPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../../config/constants'
import staffHamburgerMenuPage from '../../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import studentData from '../../../../config/studentData/createNewPenData.json'
import studentDetailsPage from '../../../../pageObjects/studentAdmin/studentSearch/studentDetailsPage'
import staffStudentSearchPage from '../../../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'
import staffDashboardPage from '../../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'

const staffLogin = new staffLoginPage()
// const menu = new staffHamburgerMenuPage()
// const studentDetails = new studentDetailsPage()
const dashboard = new staffDashboardPage()
// const staffSearch = new staffStudentSearchPage()


fixture`Student Admin`
.page(staffLoginUrl)
.beforeEach(async t => {
  await t.maximizeWindow()
})

test('Staff view Pen inbox test', async t => {

  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

  await dashboard.clickViewPenInboxButton()

})