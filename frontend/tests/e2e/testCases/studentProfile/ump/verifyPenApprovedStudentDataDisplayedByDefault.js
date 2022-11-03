import studentLoginPage from '../../../pageObjects/login/studentLoginPage'
import constants from '../../../config/constants'
import updateMyPenInfoPage from '../../../pageObjects/studentProfile/ump/updateMyPenInfoPage'


const studentLogin = new studentLoginPage()
const updatePage = new updateMyPenInfoPage()

if (constants.studentEntryPoint == "landingPage") {
    fixture`Student Profile`
      .page(
        constants.studentProfileUrl)
      .beforeEach(async t => {
        await t.resizeWindow(1920, 1080)
      })
  }
  else if (constants.studentEntryPoint == "ump") {
    fixture`Student Profile`
      .page(
        constants.studentProfileUrlUmp)
      .beforeEach(async t => {
        await t.resizeWindow(1920, 1080)
      })
  }

test('Verify default information displayed on UMP screen for Pen approved student test', async t => {

  await studentLogin.bceidLogin(constants.bceidCredentials , constants.studentEntryPoint, constants.studentProfileUrl, constants.studentProfileUrlUmp)
    
    await studentLogin.clickUpdateMyPen(constants.studentEntryPoint)

    await updatePage.assertBelowInfoText()

    await updatePage.clickNextButton()

    await updatePage.clickIDeclareCheckBox()
});