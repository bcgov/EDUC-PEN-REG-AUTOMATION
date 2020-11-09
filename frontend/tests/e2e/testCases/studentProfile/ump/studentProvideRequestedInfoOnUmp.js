import studentLoginPage from '../../../pageObjects/login/studentLoginPage'
import { bceidCredentials, studentProfileUrl } from '../../../config/constants'
import studentProvideInformationPage from '../../../pageObjects/ump/studentProvideInformationPage'
import studentData from '../../../config/studentData/studentData.json'

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

});