import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/admin/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl, studentDetailsPenNumber } from '../../../config/constants'
import studentDetailsData from '../../../config/studentDetailsData.json'
import studentDetailsUpdatedData from '../../../config/studentDetailsUpdatedData.json'
import studentDetailsPage from '../../../pageObjects/admin/studentDetailsPage'
import staffHamburgerMenuPage from '../../../pageObjects/admin/staffHamburgerMenuPage'
import staffStudentSearchPage from '../../../pageObjects/admin/staffStudentSearchPage'

const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const studentDetails = new studentDetailsPage()
const menu = new staffHamburgerMenuPage()
const staffSearch = new staffStudentSearchPage()

fixture`Staff login search update and reset student info`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login search update and reset student info test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    await dashboard.setPenNumber(studentDetailsPenNumber)

    await dashboard.clickQuickSearchButton()

    await studentDetails.setUsualSurname(studentDetailsUpdatedData.studentSearchResult.usualSurnameSearchResult)

    await studentDetails.setUsualGiven(studentDetailsUpdatedData.studentSearchResult.usualGivennameSearchResult)

    await studentDetails.setUsualMiddle(studentDetailsUpdatedData.studentSearchResult.usualMiddlenameSearchResult)

    await studentDetails.clickSaveButton()

    await menu.clickHamburgerMenu()

    await menu.clickDashboardLink()

    await dashboard.clickFullSearchButton()

    await staffSearch.setPen(studentDetailsPenNumber)

    await staffSearch.clickSearchButton()

    await staffSearch.verifyStudentSearchResult(studentDetailsPenNumber, studentDetailsUpdatedData)

    await staffSearch.clickOnFirstSearchResult()

    await studentDetails.clearUsualSurname()

    await studentDetails.clearUsualGiven()

    await studentDetails.clearUsualMiddle()

    await studentDetails.clickSaveButton()

    await menu.clickHamburgerMenu()

    await menu.clickDashboardLink()

    await dashboard.clickFullSearchButton()

    await staffSearch.clickAdvanceSearchButton()

    await staffSearch.setPen(studentDetailsPenNumber)

    await staffSearch.clickSearchButton()

    await staffSearch.verifyStudentSearchResult(studentDetailsPenNumber, studentDetailsData)

});