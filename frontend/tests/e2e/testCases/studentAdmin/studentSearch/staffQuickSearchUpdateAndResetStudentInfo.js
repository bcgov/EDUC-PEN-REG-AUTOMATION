import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl, penNumber } from '../../../config/constants'
import studentSearchResult from '../../../config/studentData/studentSearchResults.json'
import studentUpdatedSearchResult from '../../../config/studentData/studentUpdatedSearchResults.json'
import studentDetailsData from '../../../config/studentData/studentDetails.json'
import studentDetailsPage from '../../../pageObjects/studentAdmin/studentSearch/studentDetailsPage'
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import staffStudentSearchPage from '../../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'

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

    await studentDetails.verifyStudentDetails(penNumber, studentDetailsData)

    await studentDetails.setUsualSurname(studentUpdatedSearchResult.usualSurnameSearchResult)

    await studentDetails.setUsualGiven(studentUpdatedSearchResult.usualGivennameSearchResult)

    await studentDetails.setUsualMiddle(studentUpdatedSearchResult.usualMiddlenameSearchResult)

    await studentDetails.setMemo(studentUpdatedSearchResult.memoSearchResult)

    await studentDetails.clickSaveButton()

    await menu.clickHamburgerMenu()

    await menu.clickDashboardLink()

    await dashboard.clickFullSearchButton()

    await staffSearch.setPen(penNumber)

    await staffSearch.clickSearchButton()

    await staffSearch.verifyStudentSearchResult(penNumber, studentUpdatedSearchResult)

    await staffSearch.clickOnFirstSearchResult()

    await studentDetails.setUsualSurname(studentSearchResult.usualSurnameSearchResult)

    await studentDetails.setUsualGiven(studentSearchResult.usualGivennameSearchResult)

    await studentDetails.setUsualMiddle(studentSearchResult.usualMiddlenameSearchResult)

    await studentDetails.clearMemo()

    await studentDetails.clickSaveButton()

    await menu.clickHamburgerMenu()

    await menu.clickDashboardLink()

    await menu.clickHamburgerMenu()

    await menu.clickStudentSearchLink()

    await staffSearch.setPen(penNumber)

    await staffSearch.clickSearchButton()

    await staffSearch.verifyStudentSearchResult(penNumber, studentSearchResult)

});