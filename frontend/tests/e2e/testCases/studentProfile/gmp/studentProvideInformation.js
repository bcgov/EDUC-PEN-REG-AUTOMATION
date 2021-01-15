import studentLoginPage from '../../../pageObjects/login/studentLoginPage';
import studentProvideInformationPage from '../../../pageObjects/studentProfile/gmp/studentProvideInformationPage'
import { bceidCredentials, studentProfileUrl } from '../../../config/constants';
import studentData from '../../../config/studentData/studentData.json';
import staffData from '../../../config/staffData/staffData.json'

const studentLogin = new studentLoginPage()
const studentProvideInformation = new studentProvideInformationPage


fixture`Student respond with uploading identification document`
  .page(studentProfileUrl)
  .beforeEach(async t => {
    await t.maximizeWindow()
  })

test('Student respond with uploading identification document test', async t => {

  await studentLogin.bceidLogin(bceidCredentials)

  await studentLogin.clickGetMyPen()

  await studentLogin.overcomeAccountActivity()

  await studentProvideInformation.setRespondHereTextBox(studentData.respondHereText)

  await studentProvideInformation.clickUploadButton()

  await studentProvideInformation.setDocumentType(studentData.documentType)

  await studentProvideInformation.uploadDocument(studentData.uploadFileLocation)

  await studentProvideInformation.clickDoneButton()

  await studentProvideInformation.clickYesSubmitButton()

  await studentProvideInformation.verifyText(studentData.uploadConfirmationMessageOne)

  await studentProvideInformation.reloadPage()

  await studentProvideInformation.verifyText(studentData.uploadConfirmationMessageTwo)

  await studentProvideInformation.verifyText(studentData.respondHereText)

  await studentProvideInformation.verifyText(studentData.documentName)

  await studentProvideInformation.verifyText(staffData.RequestInformation)

  await studentProvideInformation.verifyText(staffData.Status[1])

});