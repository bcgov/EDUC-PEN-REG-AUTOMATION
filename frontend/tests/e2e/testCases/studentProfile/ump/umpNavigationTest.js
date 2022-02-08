import studentLoginPage from '../../../pageObjects/login/studentLoginPage'
import constants from '../../../config/constants'
import studentData from '../../../config/studentData/studentData.json'
import updateMyPenInfoPage from '../../../pageObjects/studentProfile/ump/updateMyPenInfoPage'

const studentLogin = new studentLoginPage()
const updatePage = new updateMyPenInfoPage()

if (constants.studentEntryPoint == "landingPage") {
    fixture`Student Profile`
        .page(
            constants.studentProfileUrl)
        .beforeEach(async t => {
            await t.maximizeWindow()
        })
}
else if (constants.studentEntryPoint == "ump") {
    fixture`Student Profile`
        .page(
            constants.studentProfileUrlUmp)
        .beforeEach(async t => {
            await t.maximizeWindow()
        })
}

test('ump navigation test', async t => {

    await studentLogin.bceidLogin(constants.bceidCredentials, constants.studentEntryPoint, constants.studentProfileUrl, constants.studentProfileUrlUmp)

    await studentLogin.clickUpdateMyPen(constants.studentEntryPoint)

    await updatePage.setPenNumber(constants.penNumber)

    await updatePage.setLegalFirstName(studentData.legalFirstName)

    await updatePage.setLegalLastName(studentData.legalLastName)

    await updatePage.setBirthDate(studentData)

    await updatePage.setGender(studentData)

    await updatePage.clickNextButton()

    await updatePage.clickIDeclareCheckBox()

    await updatePage.setEmail(studentData.umpEmail, constants.pen_environment)

    await updatePage.clickAccurateCheckBox()

    await updatePage.clickNextButton()

    await updatePage.VerifyAlertMessage(studentData.umpAlert)

    await updatePage.clickBackButton()

    await updatePage.verifyDataRetainedStep1(studentData)

    await updatePage.clickNextButton()

    await updatePage.waitForEmailElement()

    await updatePage.verifyNextButtonDisabled()

    await updatePage.clickAccurateCheckBox()

    await updatePage.clickNextButton()

    await updatePage.VerifyAlertMessage(studentData.umpAlert)

    await updatePage.clickEditMiddleNameCheckbox()

    await updatePage.setLegalMiddleNameStep2(studentData)

    await updatePage.clickNextButton()

    await updatePage.VerifyAlertMessage(studentData.uploadDocAlert)

    await updatePage.clickUploadButton()

    await updatePage.setDocumentType(studentData.documentType)

    await updatePage.uploadDocument(studentData.uploadFileLocation)

    await updatePage.clickNextButton()

    await updatePage.verifyNamesOnSummaryPage(studentData)

    await updatePage.verifyBirthdateOnSummaryPage(studentData)

    await updatePage.verifyGenderOnSummaryPage(studentData.retainedGenderUmp)

    await updatePage.verifyUploadOnSummaryPage(studentData.documentName)

    await updatePage.verifyEmailOnSummaryPage(studentData.umpEmail, constants.pen_environment)

    await updatePage.clickBackButton()

    await updatePage.verifyNextButtonDisabled()

    await updatePage.clickAccurateCheckBox()

    await updatePage.clickNextButton()

    await updatePage.verifyNamesOnSummaryPage(studentData)

    await updatePage.verifyBirthdateOnSummaryPage(studentData)

    await updatePage.verifyGenderOnSummaryPage(studentData.retainedGenderUmp)

    await updatePage.verifyUploadOnSummaryPage(studentData.documentName)

    await updatePage.verifyEmailOnSummaryPage(studentData.umpEmail, constants.pen_environment)

    await updatePage.clickBackButton()

    await updatePage.verifyNextButtonDisabled()

    await updatePage.clickeditGenderCheckbox()

    await updatePage.setGenderStep2(studentData.gender)

    await updatePage.clickAccurateCheckBox()

    await updatePage.clickNextButton()

    await updatePage.verifyNamesOnSummaryPage(studentData)

    await updatePage.verifyBirthdateOnSummaryPage(studentData)

    await updatePage.verifyGenderOnSummaryPage(studentData.retainedGenderGmp)

    await updatePage.verifyUploadOnSummaryPage(studentData.documentName)

    await updatePage.verifyEmailOnSummaryPage(studentData.umpEmail, constants.pen_environment)

    await updatePage.clickBackButton()

    await updatePage.clickeditGenderCheckbox()

    await updatePage.clickEditMiddleNameCheckbox()

    await updatePage.verifyNextButtonDisabled()

    await updatePage.clickAccurateCheckBox()

    await updatePage.clickNextButton()

    await updatePage.VerifyAlertMessage(studentData.umpAlert)

    await updatePage.clickCancelButton()

    await studentLogin.clickUpdateMyPen(constants.studentEntryPoint)

    await updatePage.verifyDataCleared()

    await updatePage.setPenNumber(constants.penNumber)

    await updatePage.setLegalFirstName(studentData.legalFirstName)

    await updatePage.setLegalLastName(studentData.legalLastName)

    await updatePage.setBirthDate(studentData)

    await updatePage.clickNextButton()

    await updatePage.clickIDeclareCheckBox()

    await updatePage.setEmail(studentData.umpEmail, constants.pen_environment)

    await updatePage.clickEditMiddleNameCheckbox()

    await updatePage.setLegalMiddleNameStep2(studentData)

    await updatePage.clickAccurateCheckBox()

    await updatePage.clickNextButton()    

    await updatePage.VerifyAlertMessage(studentData.uploadDocAlert)

    await updatePage.clickUploadButton()

    await updatePage.setDocumentType(studentData.documentType)

    await updatePage.uploadDocument(studentData.uploadFileLocation)

    await updatePage.clickNextButton()

    await updatePage.verifyNamesOnSummaryPage(studentData)

    await updatePage.verifyBirthdateOnSummaryPage(studentData)

    await updatePage.verifyGenderOnSummaryPage(studentData.emptyString)

    await updatePage.verifyUploadOnSummaryPage(studentData.documentName)

    await updatePage.verifyEmailOnSummaryPage(studentData.umpEmail, constants.pen_environment)

    await updatePage.clickBackButton()

    await updatePage.clickeditGenderCheckbox()

    await updatePage.setGender(studentData)

    await updatePage.verifyNextButtonDisabled()

    await updatePage.clickAccurateCheckBox()

    await updatePage.clickNextButton()

    await updatePage.verifyNamesOnSummaryPage(studentData)

    await updatePage.verifyBirthdateOnSummaryPage(studentData)

    await updatePage.verifyGenderOnSummaryPage(studentData.retainedGenderUmp)

    await updatePage.verifyUploadOnSummaryPage(studentData.documentName)

    await updatePage.verifyEmailOnSummaryPage(studentData.umpEmail, constants.pen_environment)

    await updatePage.clickBackButton()

    await updatePage.clickeditGenderCheckbox()

    await updatePage.verifyNextButtonDisabled()

    await updatePage.clickAccurateCheckBox()

    await updatePage.clickNextButton()

    await updatePage.verifyNamesOnSummaryPage(studentData)

    await updatePage.verifyBirthdateOnSummaryPage(studentData)

    await updatePage.verifyGenderOnSummaryPage(studentData.emptyString)

    await updatePage.verifyUploadOnSummaryPage(studentData.documentName)

    await updatePage.verifyEmailOnSummaryPage(studentData.umpEmail, constants.pen_environment)

    await updatePage.clickBackButton()

    await updatePage.clickBackButton()

    await updatePage.setGender(studentData)

    await updatePage.clickNextButton()

    await updatePage.clickAccurateCheckBox()

    await updatePage.clickNextButton()

    await updatePage.verifyNamesOnSummaryPage(studentData)

    await updatePage.verifyBirthdateOnSummaryPage(studentData)

    await updatePage.verifyGenderOnSummaryPage(studentData.retainedGenderUmp)

    await updatePage.verifyUploadOnSummaryPage(studentData.documentName)

    await updatePage.verifyEmailOnSummaryPage(studentData.umpEmail, constants.pen_environment)

});