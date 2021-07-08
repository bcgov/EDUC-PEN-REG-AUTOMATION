import studentLoginPage from '../../../pageObjects/login/studentLoginPage';
import penRequestForm from '../../../pageObjects/studentProfile/gmp/penRequestForm';
import constants from '../../../config/constants';
import studentData from '../../../config/studentData/studentData.json';


const studentLogin = new studentLoginPage()
const penRequest = new penRequestForm()

if (constants.studentEntryPoint == "landingPage") {
    fixture`Student Profile`
        .page(
            constants.studentProfileUrl)
        .beforeEach(async t => {
            await t.maximizeWindow()
        })
}
else if (constants.studentEntryPoint == "gmp") {
    fixture`Student Profile`
        .page(
            constants.studentProfileUrlGmp)
        .beforeEach(async t => {
            await t.maximizeWindow()
        })
}

test('gmp navigation test', async t => {

    await studentLogin.bceidLogin(constants.bceidCredentials, constants.studentEntryPoint, constants.studentProfileUrl, constants.studentProfileUrlGmp)

    await studentLogin.overcomeAccountActivity()

    await studentLogin.clickGetMyPen(constants.studentEntryPoint)

    await studentLogin.overcomeCreateNewPenRequest()

    await penRequest.verifyNextButtonDisabled()

    await penRequest.clickCheckBoxOne()

    await penRequest.verifyNextButtonDisabled()

    await penRequest.clickCheckBoxTwo()

    await penRequest.verifyNextButtonDisabled()

    await penRequest.setLegalLastName(studentData)

    await penRequest.selectGender(studentData)

    await penRequest.setPastname(studentData)

    await penRequest.setDob(studentData)

    await penRequest.verifyNextButtonDisabled()

    await penRequest.setEmail(studentData, constants.pen_environment)

    await penRequest.verifyNextButtonEnabled()

    await penRequest.clickNextButton()

    await penRequest.verifyConfirmGmpSubmitText(studentData)

    await penRequest.clickBackButton()

    await penRequest.verifyDataRetained(studentData, constants.pen_environment)

    await penRequest.verifyNextButtonDisabled()

    await penRequest.clickCheckBoxTwo()
    
    await penRequest.clickNextButton()

    await penRequest.verifyConfirmGmpSubmitText(studentData)

    await penRequest.clickBackButton()

    await penRequest.verifyNextButtonDisabled()

    await penRequest.verifyDataRetained(studentData, constants.pen_environment)

    await penRequest.clickCheckBoxTwo()

    await penRequest.clickNextButton()

    await penRequest.verifyConfirmGmpSubmitText(studentData)

    await penRequest.clickBackButton()

    await penRequest.verifyDataRetained(studentData, constants.pen_environment)

    await penRequest.clearLegalLastName()

    await penRequest.setLegalFirstName(studentData)

    await penRequest.verifyNextButtonDisabled()

    await penRequest.clearLegalFirstName()

    await penRequest.setLegalLastName(studentData)

    await penRequest.verifyNextButtonDisabled()

    await penRequest.clickCheckBoxTwo()
    
    await penRequest.verifyNextButtonEnabled()

    await penRequest.clickNextButton()

    await penRequest.verifyConfirmGmpSubmitText(studentData)

    await penRequest.clickCancelButton()

    await studentLogin.clickGetMyPen(constants.studentEntryPoint)

    await penRequest.clickCheckBoxOne()

    await penRequest.verifyDataCleared()
});
