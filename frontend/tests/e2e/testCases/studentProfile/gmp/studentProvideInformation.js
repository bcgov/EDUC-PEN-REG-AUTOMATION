import studentLoginPage from '../../../pageObjects/login/studentLoginPage';
import studentProvideInformationPage from '../../../pageObjects/studentProfile/gmp/studentProvideInformationPage'
import constants from '../../../config/constants';
import studentData from '../../../config/studentData/studentData.json';
import staffData from '../../../config/staffData/staffData.json'

const studentLogin = new studentLoginPage()
const studentProvideInformation = new studentProvideInformationPage


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

test('Student respond with uploading identification document test', async t => {

  await studentLogin.bceidLogin(constants.bceidCredentials, constants.studentEntryPoint, constants.studentProfileUrl, constants.studentProfileUrlGmp)

  await studentLogin.overcomeAccountActivity()

  await studentLogin.clickGetMyPen(constants.studentEntryPoint)

  await studentProvideInformation.setRespondHereTextBox(studentData.respondHereText)

  await studentProvideInformation.clickUploadButton()

  await studentProvideInformation.setDocumentType(studentData.documentType)

  await studentProvideInformation.uploadDocument(studentData.uploadFileLocation)

  await studentProvideInformation.clickUploadButton()

  await studentProvideInformation.setDocumentType(studentData.documentType2)

  await studentProvideInformation.uploadDocument(studentData.uploadFileLocation2)

  await studentProvideInformation.clickUploadButton()

  await studentProvideInformation.setDocumentType(studentData.documentType)

  await studentProvideInformation.verifyMaxFileSizeError(studentData.uploadFileLocation3)

  await studentProvideInformation.clickDoneButton()

  await studentProvideInformation.clickYesSubmitButton()

  await studentProvideInformation.verifyText(studentData.uploadConfirmationMessageOne)

  await studentProvideInformation.reloadPage()

  await studentProvideInformation.verifyText(studentData.uploadConfirmationMessageTwo)

  await studentProvideInformation.verifyText(studentData.respondHereText)

  await studentProvideInformation.verifyText(studentData.documentName)

  await studentProvideInformation.verifyText(studentData.documentName2)

  await studentProvideInformation.verifyText(staffData.RequestInformation)

  await studentProvideInformation.verifyText(staffData.Status[1])

});