import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import { idirAdminCredentials, staffLoginUrl} from '../../../config/constants'
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import studentData from '../../../config/studentData/createNewPenData.json'
import createNewPenPage from '../../../pageObjects/studentAdmin/createNewPen/createNewPenPage'
import studentDetailsPage from '../../../pageObjects/studentAdmin/studentSearch/studentDetailsPage'
import staffStudentSearchPage from '../../../pageObjects/studentAdmin/studentSearch/staffStudentSearchPage'

const staffLogin = new staffLoginPage()
const menu = new staffHamburgerMenuPage()
const create = new createNewPenPage()
const studentDetails = new studentDetailsPage()
const studentSearch = new staffStudentSearchPage()


fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff create New Pen test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials,staffLoginUrl)

    await menu.clickHamburgerMenu()

    await menu.clickInfrequentProcessLink()

    await menu.clickCreateNewPenLink()

    await create.clickEnterDataButton()

    await create.setLegalSurname(studentData.legalSurname)

    await create.setLegalGivenName(studentData.legalGivenname)

    await create.setLegalMiddleNames(studentData.legalMiddlename)

    await create.setUsualSurname(studentData.legalSurname)

    await create.setUsualGivenName(studentData.legalGivenname)

    await create.setUsualMiddleNames(studentData.legalMiddlename)

    await create.setBirthDate(studentData.birthDate)

    await create.setGender(studentData.gender)

    await create.setMincode(studentData.mincode)

    await create.setGrade(studentData.grade)

    await create.setPostalCode(studentData.postalCode)

    await create.clickSearchButton()

    await create.clickIssueNewPenButton()

    await studentDetails.verifyStudentDetailsPageDisplayed()

    await studentDetails.setMemo(studentData.memo)

    await studentDetails.clickSaveButton()

    await menu.clickHamburgerMenu()

    await menu.clickStudentSearchLink()

    await studentSearch.setLegalSurname(studentData.legalSurname)

    await studentSearch.setLegalGiven(studentData.legalGivenname)

    await studentSearch.clickSearchButton()

    await studentSearch.verifyDetailsOfNewPenCreated(studentData)

})