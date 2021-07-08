import studentLoginPage from '../../../pageObjects/login/studentLoginPage'
import constants from '../../../config/constants'
import studentData from '../../../config/studentData/studentData.json'
import updateMyPenInfoPage from '../../../pageObjects/studentProfile/ump/updateMyPenInfoPage'

const studentLogin = new studentLoginPage()
const updatePage = new updateMyPenInfoPage()

if (constants.studentEntryPoint == "landingPage") {
    fixture`Student Profile`
        .page(
            constants.studentProfileUrl)
        .beforeEach(async t => {
            await t.maximizeWindow()
        })
}
else if (constants.studentEntryPoint == "ump") {
    fixture`Student Profile`
        .page(
            constants.studentProfileUrlUmp)
        .beforeEach(async t => {
            await t.maximizeWindow()
        })
}

test('ump navigation test', async t => {

    await studentLogin.bceidLogin(constants.bceidCredentials, constants.studentEntryPoint, constants.studentProfileUrl, constants.studentProfileUrlUmp)

    await studentLogin.clickUpdateMyPen(constants.studentEntryPoint)

    await updatePage.setPenNumber(constants.penNumber)

    await updatePage.setLegalFirstName(studentData.legalFirstName)

    await updatePage.setLegalLastName(studentData.legalLastName)

    await updatePage.setBirthDate(studentData)

    await updatePage.setGender(studentData)

    await updatePage.clickNextButton()

    await updatePage.clickIDeclareCheckBox()

    await updatePage.setEmail(studentData.umpEmail,constants.pen_environment)

    await updatePage.clickAccurateCheckBox()

    await updatePage.clickNextButton()

    await updatePage.VerifyAlertMessage(studentData.umpAlert)

    await updatePage.clickBackButton()

    await updatePage.verifyDataRetainedStep1(studentData)

});