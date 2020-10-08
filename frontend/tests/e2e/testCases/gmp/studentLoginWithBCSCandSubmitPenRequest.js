import studentLoginPage from '../../pageObjects/login/studentLoginPage';
import penRequestForm from '../../pageObjects/gmp/penRequestForm';
import { bcscCredentials, studentProfileUrlBcsc } from '../../config/constants';
import bcscStudentData from '../../config/studentData/bcscStudentData.json'

const studentLogin = new studentLoginPage()
const penRequest = new penRequestForm()


fixture`BCSC Login and Fill Pen request form`
  .page(studentProfileUrlBcsc)
  .beforeEach(async t => {
    await t.maximizeWindow()
  })

test('BCSC Login and Fill Pen request form test', async t => {

  await studentLogin.bcscLogin(bcscCredentials)

  await studentLogin.overcomeAccountActivity()

  await studentLogin.clickGetMyPen()

  await studentLogin.overcomeCreateNewPenRequest()

  await penRequest.bcscFillPenRequestForm(bcscStudentData, true);
  
});
