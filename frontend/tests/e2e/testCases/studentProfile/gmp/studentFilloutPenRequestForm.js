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

test('Bceid Login and Fill Pen request form test', async t => {

  await studentLogin.bceidLogin(constants.bceidCredentials , constants.studentEntryPoint)

  await studentLogin.overcomeAccountActivity()

  await studentLogin.clickGetMyPen(constants.studentEntryPoint)

  await studentLogin.overcomeCreateNewPenRequest()

  await penRequest.fillRequestForm(studentData, true, constants.pen_environment);

});
