import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import { idirAdminCredentials, staffLoginUrl} from '../../../config/constants'
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import studentData from '../../../config/studentData/createNewPenData.json'
import createNewPenPage from '../../../pageObjects/studentAdmin/createNewPen/createNewPenPage'

const staffLogin = new staffLoginPage()
const menu = new staffHamburgerMenuPage()
const create = new createNewPenPage()


fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff verify validation errors on create new pen screen test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials,staffLoginUrl)

    await menu.clickHamburgerMenu()

    await menu.clickInfrequentProcessLink()

    await menu.clickCreateNewPenLink()

    await create.clickEnterDataButton()

    await create.setLegalSurname(studentData.legalSurnameError)

    await create.setLegalGivenName(studentData.legalGivennameError)

    await create.setLegalMiddleNames(studentData.legalMiddlenameError)

    await create.setUsualSurname(studentData.legalSurnameError)

    await create.setUsualGivenName(studentData.legalGivennameError)

    await create.setUsualMiddleNames(studentData.legalMiddlenameError)

    await create.setBirthDate(studentData.birthDate)

    await create.setGender(studentData.gender)

    await create.setMincode(studentData.mincode)

    await create.clickSearchButton()

    await create.verifyValidationErrors(studentData.nameErrorDescription, 6)

    await create.verifyValidationErrors(studentData.gradeErrorDescription, 1)

})