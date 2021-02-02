import studentLoginPage from '../../../pageObjects/login/studentLoginPage'
import { bceidCredentials, studentProfileUrl, penNumber, pen_environment} from '../../../config/constants'
import studentData from '../../../config/studentData/studentData.json'
import updateMyPenInfoPage from '../../../pageObjects/studentProfile/ump/updateMyPenInfoPage'

const studentLogin = new studentLoginPage()
const updatePage = new updateMyPenInfoPage()

fixture`Student submit firstname change UMPI`
    .page(studentProfileUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Student submit firstname change test UMPI', async t => {

    await studentLogin.bceidLogin(bceidCredentials)
    
    await studentLogin.clickUpdateMyPen()

    await updatePage.setPenNumber(penNumber)

    await updatePage.setLegalFirstName(studentData.legalFirstName)

    await updatePage.setLegalLastName(studentData.legalLastName)

    await updatePage.setBirthDate(studentData)

    await updatePage.setGender(studentData)

    await updatePage.clickNextButton()

    await updatePage.clickIDeclareCheckBox()

    await updatePage.editFirstName(studentData.legalLastName)

    await updatePage.setEmail(studentData.umpEmail,pen_environment)

    await updatePage.clickAccurateCheckBox()

    await updatePage.clickNextButton()

    await updatePage.clickNextButton()

    await updatePage.submitConfirmationDisplayed(studentData.umpRequestSubmissionConfirmationText)

});