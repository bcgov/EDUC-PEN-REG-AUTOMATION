import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/admin/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl, penNumber } from '../../../config/constants'
import studentSearchResult from '../../../config/studentData/studentSearchResults.json'
import studentUpdatedSearchResult from '../../../config/studentData/studentUpdatedSearchResults.json'
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

    await dashboard.setPenNumber(penNumber)

    await dashboard.clickQuickSearchButton()

    await studentDetails.setUsualSurname(studentUpdatedSearchResult.usualSurnameSearchResult)

    await studentDetails.setUsualGiven(studentUpdatedSearchResult.usualGivennameSearchResult)

    await studentDetails.setUsualMiddle(studentUpdatedSearchResult.usualMiddlenameSearchResult)

    await studentDetails.clickSaveButton()

    await menu.clickHamburgerMenu()

    await menu.clickDashboardLink()

    await dashboard.clickFullSearchButton()

    await staffSearch.setPen(penNumber)

    await staffSearch.clickSearchButton()

    await staffSearch.verifyStudentSearchResult(penNumber, studentUpdatedSearchResult)

    await staffSearch.clickOnFirstSearchResult()

    await studentDetails.clearUsualSurname()

    await studentDetails.clearUsualGiven()

    await studentDetails.clearUsualMiddle()

    await studentDetails.clickSaveButton()

    await menu.clickHamburgerMenu()

    await menu.clickDashboardLink()

    await dashboard.clickFullSearchButton()

    await staffSearch.clickAdvanceSearchButton()

    await staffSearch.setPen(penNumber)

    await staffSearch.clickSearchButton()

    await staffSearch.verifyStudentSearchResult(penNumber, studentSearchResult)

});