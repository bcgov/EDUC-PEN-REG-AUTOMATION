import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import { idirAdminCredentials, staffLoginUrl, penNumber } from '../../../config/constants'
import studentDetailsPage from '../../../pageObjects/studentAdmin/studentSearch/studentDetailsPage'
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import staffStudentSearchPage from '../../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'
import studentData from '../../../config/studentData/studentDetailsValidationErrors.json'
import studentDetailsData from '../../../config/studentData/studentDetails.json'

const staffLogin = new staffLoginPage()
const dashboard = new staffDashboardPage()
const studentDetails = new studentDetailsPage()
const menu = new staffHamburgerMenuPage()
const staffSearch = new staffStudentSearchPage()

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and verify validation errors test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

    await dashboard.setPenNumber(penNumber)

    await dashboard.clickQuickSearchButton()

    await studentDetails.verifyStudentDetails(penNumber, studentDetailsData)

    await studentDetails.setLegalSurname(studentData.studentDetails.legalLastName)

    await studentDetails.setLegalGiven(studentData.studentDetails.legalFirstName)

    await studentDetails.setLegalMiddle(studentData.studentDetails.legalMiddleNames)

    await studentDetails.setUsualSurname(studentData.studentDetails.usualLastName)

    await studentDetails.setUsualGiven(studentData.studentDetails.usualFirstName)

    await studentDetails.setUsualMiddle(studentData.studentDetails.usualMiddleNames)

    await studentDetails.setBirthdate(studentData.studentDetails.dob)

    await studentDetails.clickSaveButton()

    await studentDetails.verifyValidationErrors(studentData.validationErrors.legalLastNameErrors, 1)

    await studentDetails.verifyValidationErrors(studentData.validationErrors.legalFirstNameErrors, 2)

    await studentDetails.verifyValidationErrors(studentData.validationErrors.legalMiddleNamesErrors, 3)

    await studentDetails.verifyValidationErrors(studentData.validationErrors.usualLastNameErrors, 4)

    await studentDetails.verifyValidationErrors(studentData.validationErrors.usualFirstNameErrors, 5)

    await studentDetails.verifyValidationErrors(studentData.validationErrors.usualMiddleNamesErrors, 6)

    await studentDetails.verifyValidationErrors(studentData.validationErrors.dobErrors, 8)

});