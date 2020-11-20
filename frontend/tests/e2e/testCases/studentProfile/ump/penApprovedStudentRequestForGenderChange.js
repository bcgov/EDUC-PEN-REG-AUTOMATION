import studentLoginPage from '../../../pageObjects/login/studentLoginPage'
import { bceidCredentials, studentProfileUrl } from '../../../config/constants'
import studentData from '../../../config/studentData/studentData.json'
import updateMyPenInfoPage from '../../../pageObjects/studentProfile/ump/updateMyPenInfoPage'


const studentLogin = new studentLoginPage()
const updatePage = new updateMyPenInfoPage()

fixture`Pen approved student submits gender change request`
    .page(studentProfileUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Pen approved student submits gender change request test', async t => {

    await studentLogin.bceidLogin(bceidCredentials)
    
    await studentLogin.clickUpdateMyPen()

    await updatePage.clickNextButton()

    await updatePage.clickIDeclareCheckBox()

    await updatePage.clickeditGenderCheckbox()

    await updatePage.setGender(studentData)

    await updatePage.clickAccurateCheckBox()

    await updatePage.clickNextButton()

    await updatePage.clickSubmitButton()

});