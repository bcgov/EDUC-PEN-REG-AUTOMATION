import studentLoginPage from '../../pageObjects/login/studentLoginPage'
import { bceidCredentials, studentProfileUrl } from '../../config/constants'
import studentInformationVerificationPage from '../../pageObjects/gmp/studentInformationVerificationPage'

const studentLogin = new studentLoginPage()
const verify = new studentInformationVerificationPage()

fixture`Verify student unlinked with pen number`
  .page(studentProfileUrl)
  .beforeEach(async t => {
    await t.maximizeWindow()
  })

test('Verify student unlinked with pen number test', async t => {

  await studentLogin.bceidLogin(bceidCredentials)

  await studentLogin.clickGetMyPen()

  await studentLogin.overcomeAccountActivity()

  await verify.studentUnlinked()

});