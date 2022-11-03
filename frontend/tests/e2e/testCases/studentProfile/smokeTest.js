import studentLoginPage from '../../pageObjects/login/studentLoginPage';
import penRequestForm from '../../pageObjects/studentProfile/gmp/penRequestForm';
import constants from '../../config/constants';
import studentData from '../../config/studentData/studentData.json';
import updateMyPenInfoPage from '../../pageObjects/studentProfile/ump/updateMyPenInfoPage'


const studentLogin = new studentLoginPage()
const penRequest = new penRequestForm()
const updatePage = new updateMyPenInfoPage()

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

test('Smoke test', async t => {

  await studentLogin.bceidLogin(constants.bceidCredentials , constants.studentEntryPoint , constants.studentProfileUrl, constants.studentProfileUrlGmp)

  await studentLogin.overcomeAccountActivity()

  await studentLogin.clickGetMyPen(constants.studentEntryPoint)

  await studentLogin.overcomeCreateNewPenRequest()

  await penRequest.fillRequestForm(studentData, false, constants.pen_environment);

  await studentLogin.clickOnDisplayName()

  await studentLogin.clickHomeButton()

  await studentLogin.clickUpdateMyPen(constants.studentEntryPoint)

  await updatePage.setPenNumber(constants.penNumber)

  await updatePage.setLegalFirstName(studentData.legalFirstName)

  await updatePage.setLegalLastName(studentData.legalLastName)

  await updatePage.setBirthDate(studentData)

  //await updatePage.setGender(studentData)

  await updatePage.clickNextButton()

  await updatePage.clickIDeclareCheckBox()

  await updatePage.editFirstName(studentData.legalLastName)

  await updatePage.setEmail(studentData.umpEmail,constants.pen_environment)

  await updatePage.clickAccurateCheckBox()

  await updatePage.clickNextButton()

});
