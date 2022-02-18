import studentLoginPage from '../../../pageObjects/login/studentLoginPage';
import penRequestForm from '../../../pageObjects/studentProfile/gmp/penRequestForm';
import constants from '../../../config/constants';
import bcscStudentData from '../../../config/studentData/bcscStudentData.json'

const studentLogin = new studentLoginPage()
const penRequest = new penRequestForm()


fixture`Student Profile`
  .page(constants.studentProfileUrlBcsc)
  .beforeEach(async t => {
    await t.maximizeWindow()
  })

test('BCSC Login and Fill Pen request form test', async t => {

  await studentLogin.bcscLogin(constants.bcscCredentials)

  await studentLogin.overcomeAccountActivity()

  await studentLogin.clickGetMyPen(constants.studentEntryPoint)

  await studentLogin.overcomeCreateNewPenRequest()

  await penRequest.bcscFillPenRequestForm(bcscStudentData, true, constants.pen_environment);

});
