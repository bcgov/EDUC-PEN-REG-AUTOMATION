import studentLoginPage from '../../../pageObjects/login/studentLoginPage'
import constants from '../../../config/constants'
import studentProvideInformationPage from '../../../pageObjects/studentProfile/ump/studentProvideInformationPage'
import studentData from '../../../config/studentData/studentData.json'
import staffData from '../../../config/staffData/staffData.json'

const studentLogin = new studentLoginPage()
const provideInfo = new studentProvideInformationPage()

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
test('Student provide information UMPI test', async t => {

    await studentLogin.bceidLogin(constants.bceidCredentials , constants.studentEntryPoint, constants.studentProfileUrl, constants.studentProfileUrlUmp)

    await studentLogin.clickUpdateMyPen(constants.studentEntryPoint)

    await studentLogin.overcomeAccountActivity()

    await provideInfo.setRespondHereTextBox(studentData.respondHereText)
  
    await provideInfo.clickUploadButton()
  
    await provideInfo.setDocumentType(studentData.documentType)
  
    await provideInfo.uploadDocument(studentData.uploadFileLocation)
  
    await provideInfo.clickUploadButton()
  
    await provideInfo.setDocumentType(studentData.documentType2)
  
    await provideInfo.uploadDocument(studentData.uploadFileLocation2)

    await provideInfo.clickUploadButton()
  
    await provideInfo.setDocumentType(studentData.documentType2)
  
    await provideInfo.verifyMaxFileSizeError(studentData.uploadFileLocation3)

    await provideInfo.clickDoneButton()
  
    await provideInfo.clickYesSubmitButton()

    await provideInfo.verifyText(studentData.uploadConfirmationMessageOne)

    await provideInfo.reloadPage()
  
    await provideInfo.verifyText(studentData.uploadConfirmationMessageThree)
  
    await provideInfo.verifyText(studentData.respondHereText)
  
    await provideInfo.verifyText(studentData.documentName)

    await provideInfo.verifyText(studentData.documentName2)
  
    await provideInfo.verifyText(staffData.RequestInformation)
  
    await provideInfo.verifyText(staffData.Status[1])

});