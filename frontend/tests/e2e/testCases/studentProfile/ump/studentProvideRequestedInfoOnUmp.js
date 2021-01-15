import studentLoginPage from '../../../pageObjects/login/studentLoginPage'
import { bceidCredentials, studentProfileUrl } from '../../../config/constants'
import studentProvideInformationPage from '../../../pageObjects/studentProfile/ump/studentProvideInformationPage'
import studentData from '../../../config/studentData/studentData.json'
import staffData from '../../../config/staffData/staffData.json'

const studentLogin = new studentLoginPage()
const provideInfo = new studentProvideInformationPage

fixture`Student provide information UMPI`
    .page(studentProfileUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Student provide information UMPI test', async t => {

    await studentLogin.bceidLogin(bceidCredentials)

    await studentLogin.clickUpdateMyPen()

    await studentLogin.overcomeAccountActivity()

    await provideInfo.setRespondHereTextBox(studentData.respondHereText)
  
    await provideInfo.clickUploadButton()
  
    await provideInfo.setDocumentType(studentData.documentType)
  
    await provideInfo.uploadDocument(studentData.uploadFileLocation)
  
    await provideInfo.clickDoneButton()
  
    await provideInfo.clickYesSubmitButton()

    await provideInfo.verifyText(studentData.uploadConfirmationMessageOne)

    await provideInfo.reloadPage()
  
    await provideInfo.verifyText(studentData.uploadConfirmationMessageThree)
  
    await provideInfo.verifyText(studentData.respondHereText)
  
    await provideInfo.verifyText(studentData.documentName)
  
    await provideInfo.verifyText(staffData.RequestInformation)
  
    await provideInfo.verifyText(staffData.Status[1])

});