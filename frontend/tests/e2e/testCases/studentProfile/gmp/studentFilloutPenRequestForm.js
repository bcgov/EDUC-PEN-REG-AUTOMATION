import studentLoginPage from '../../../pageObjects/login/studentLoginPage';
import penRequestForm from '../../../pageObjects/studentProfile/gmp/penRequestForm';
import { bceidCredentials, studentProfileUrl, pen_environment } from '../../../config/constants';
import studentData from '../../../config/studentData/studentData.json';


const studentLogin = new studentLoginPage()
const penRequest = new penRequestForm()


fixture`Bceid Login and Fill Pen request form`
  .page(studentProfileUrl)
  .beforeEach(async t => {
    await t.maximizeWindow()
  })

test('Bceid Login and Fill Pen request form test', async t => {

  await studentLogin.bceidLogin(bceidCredentials)

  await studentLogin.overcomeAccountActivity()

  await studentLogin.clickGetMyPen()

  await studentLogin.overcomeCreateNewPenRequest()

  await penRequest.fillRequestForm(studentData, true , pen_environment);
  
});
