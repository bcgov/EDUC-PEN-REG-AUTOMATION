import studentLoginPage from '../../../pageObjects/login/studentLoginPage';
import { bceidCredentials, studentProfileUrl } from '../../../config/constants';

const studentLogin = new studentLoginPage()


fixture`Navigation`
  .page(studentProfileUrl)
  .beforeEach(async t => {
    await t.resizeWindow(1920, 1080).setTestSpeed(0.5)
  })

test('Bceid Login and Verify GMP and UMP navigation test', async t => {

  await studentLogin.bceidLogin(bceidCredentials)

  await studentLogin.clickGetMyPen()

  await studentLogin.overcomeAccountActivity()

  await studentLogin.clickOnDisplayName()

  await studentLogin.clickHomeButton()

  await studentLogin.clickGetMyPen()

  await studentLogin.clickCancelButton()

  await studentLogin.clickUpdateMyPen()

  await studentLogin.clickOnDisplayName()

  await studentLogin.clickHomeButton()

  await studentLogin.clickUpdateMyPen()
  
  await studentLogin.clickCancelButton()
  
});