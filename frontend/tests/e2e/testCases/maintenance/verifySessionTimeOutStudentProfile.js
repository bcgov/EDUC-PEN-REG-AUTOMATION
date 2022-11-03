import studentLoginPage from '../../pageObjects/login/studentLoginPage';
import penRequestForm from '../../pageObjects/studentProfile/gmp/penRequestForm';
import constants from '../../config/constants';
import studentData from '../../config/studentData/studentData.json';
import updateMyPenInfoPage from '../../pageObjects/studentProfile/ump/updateMyPenInfoPage'
import createNewPenPage from '../../pageObjects/studentAdmin/createNewPen/createNewPenPage'


const studentLogin = new studentLoginPage()
const penRequest = new penRequestForm()
const updatePage = new updateMyPenInfoPage()
const create = new createNewPenPage()

if (constants.studentEntryPoint == "landingPage") {
    fixture`Student Profile`
        .page(
            constants.studentProfileUrl)
        .beforeEach(async t => {
          await t.resizeWindow(1920, 1080)
        })
}
else if (constants.studentEntryPoint == "gmp") {
    fixture`Student Profile`
        .page(
            constants.studentProfileUrlGmp)
        .beforeEach(async t => {
          await t.resizeWindow(1920, 1080)
        })
}

test('Session Timeout test student profile', async t => {

    await studentLogin.bceidLogin(constants.bceidCredentials, constants.studentEntryPoint, constants.studentProfileUrl, constants.studentProfileUrlGmp)

    await studentLogin.overcomeAccountActivity()

    await studentLogin.clickGetMyPen(constants.studentEntryPoint)

    await penRequest.clickCheckBoxOne()

    await penRequest.setLegalLastName(studentData)

    await create.implicitWait(1)

    // Round 1 complete


    await studentLogin.clickOnDisplayName()

    await studentLogin.clickHomeButton()

    await studentLogin.clickUpdateMyPen(constants.studentEntryPoint)

    await updatePage.setPenNumber(constants.penNumber)

    await updatePage.setLegalFirstName(studentData.legalFirstName)

    await create.implicitWait(2)

    //Round 2 complete


    await studentLogin.clickOnDisplayName()

    await studentLogin.clickHomeButton()

    await studentLogin.clickGetMyPen(constants.studentEntryPoint)

    await penRequest.clickCheckBoxOne()

    await penRequest.setLegalLastName(studentData)

    await create.implicitWait(3)

    // Round 3 complete


    await studentLogin.clickOnDisplayName()

    await studentLogin.clickHomeButton()

    await studentLogin.clickUpdateMyPen(constants.studentEntryPoint)

    await updatePage.setPenNumber(constants.penNumber)

    await updatePage.setLegalFirstName(studentData.legalFirstName)

    await create.implicitWait(4)

    await studentLogin.clickOnDisplayName()

    await studentLogin.clickHomeButton()

    await studentLogin.clickGetMyPen(constants.studentEntryPoint)

    // Round 4 complete

    await penRequest.fillRequestForm(studentData, true, constants.pen_environment);

});
