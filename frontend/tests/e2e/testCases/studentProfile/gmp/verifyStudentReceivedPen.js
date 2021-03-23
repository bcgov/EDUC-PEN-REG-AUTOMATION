import studentLoginPage from '../../../pageObjects/login/studentLoginPage';
import { bceidCredentials, studentProfileUrl , penNumber } from '../../../config/constants'
import studentInformationVerificationPage from '../../../pageObjects/studentProfile/gmp/studentInformationVerificationPage'

const studentLogin = new studentLoginPage()
const verify = new studentInformationVerificationPage()

fixture`Student Profile`
  .page(studentProfileUrl)
  .beforeEach(async t => {
    await t.maximizeWindow()
  })

test('Verify student received pen number test', async t => {

  await studentLogin.bceidLogin(bceidCredentials)

  await studentLogin.clickGetMyPen()

  await studentLogin.overcomeAccountActivity()

  await verify.studentReceivedPen(penNumber)

});
