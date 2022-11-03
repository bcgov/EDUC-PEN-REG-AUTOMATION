import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants'
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import studentData from '../../../config/studentData/createNewPenData.json'
import studentDetailsPage from '../../../pageObjects/studentAdmin/studentSearch/studentDetailsPage'
import staffStudentSearchPage from '../../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'

const staffLogin = new staffLoginPage()
const menu = new staffHamburgerMenuPage()
const studentDetails = new studentDetailsPage()
const dashboard = new staffDashboardPage()
const staffSearch = new staffStudentSearchPage()


fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080)
    })

test('Staff create New Pen test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.clickFullSearchButton()

    await staffSearch.verifyCreateNewPenButtonDisabled()

    await staffSearch.setLegalSurname(studentData.legalSurname)

    await staffSearch.setLegalGiven(studentData.legalGivenname)

    await staffSearch.clickSearchButton()

    await staffSearch.verifyCreateNewPenButtonDisabled()

    await staffSearch.setLegalMiddle(studentData.legalMiddlename)

    await staffSearch.setUsualSurname(studentData.usualSurname)

    await staffSearch.clickSearchButton()

    await staffSearch.verifyCreateNewPenButtonDisabled()

    await staffSearch.setUsualGiven(studentData.usualGivenname)

    await staffSearch.setUsualMiddle(studentData.usualMiddlename)

    await staffSearch.clickSearchButton()

    await staffSearch.verifyCreateNewPenButtonDisabled()

    await staffSearch.setGender(studentData.gender)

    await staffSearch.clickSearchButton()

    await staffSearch.verifyCreateNewPenButtonDisabled()

    await staffSearch.setDateOfBirth(studentData)

    await staffSearch.clickSearchButton()

    await staffSearch.verifyCreateNewPenButtonEnabled()

    await staffSearch.clickCreateNewPenButton()

    await staffSearch.clickCreateNewPenSubmitButton()

    await studentDetails.verifyStudentDetailsPageDisplayed(studentData)

    await studentDetails.verifyNewlyCreatedPenStudentDetails(studentData)
})