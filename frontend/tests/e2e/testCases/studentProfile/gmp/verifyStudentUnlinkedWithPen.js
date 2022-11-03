import studentLoginPage from '../../../pageObjects/login/studentLoginPage'
import constants from '../../../config/constants'
import studentInformationVerificationPage from '../../../pageObjects/studentProfile/gmp/studentInformationVerificationPage'

const studentLogin = new studentLoginPage()
const verify = new studentInformationVerificationPage()

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

test('Verify student unlinked with pen number test', async t => {

  await studentLogin.bceidLogin(constants.bceidCredentials , constants.studentEntryPoint , constants.studentProfileUrl, constants.studentProfileUrlGmp)

  await studentLogin.overcomeAccountActivity()

  await studentLogin.clickGetMyPen(constants.studentEntryPoint)

  await verify.studentUnlinked()

});