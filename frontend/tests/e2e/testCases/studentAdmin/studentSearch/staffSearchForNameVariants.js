import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants'
import staffStudentSearchPage from '../../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'
import studentData from '../../../config/studentData/nameVariantsData.json'

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

    await staffSearch.setLegalGiven(studentData.name1)

    await staffSearch.clickSearchNameVariantsCheckBox()

    await staffSearch.clickSearchButton()

    await staffSearch.verifyTableCell(studentData.nameVariant1)

    await staffSearch.clickClearButton()

    await staffSearch.setLegalGiven(studentData.name2)

    await staffSearch.clickSearchNameVariantsCheckBox()

    await staffSearch.clickSearchButton()

    await staffSearch.verifyTableCell(studentData.nameVariant2)

    await staffSearch.clickClearButton()

    await staffSearch.setLegalGiven(studentData.name3)

    await staffSearch.clickSearchNameVariantsCheckBox()

    await staffSearch.clickSearchButton()

    await staffSearch.verifyTableCell(studentData.nameVariant3)

});