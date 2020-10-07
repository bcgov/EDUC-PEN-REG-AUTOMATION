import studentLoginPage from '../../pageObjects/login/studentLoginPage'
import { bceidCredentials, studentProfileUrl } from '../../config/constants'
import updateMyPenInfoPage from '../../pageObjects/ump/updateMyPenInfoPage'


const studentLogin = new studentLoginPage()
const updatePage = new updateMyPenInfoPage()

fixture`Verify default information displayed on UMP screen for Pen approved student`
    .page(studentProfileUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Verify default information displayed on UMP screen for Pen approved student test', async t => {

    await studentLogin.bceidLogin(bceidCredentials)
    
    await studentLogin.clickUpdateMyPen()

    await updatePage.assertBelowInfoText()

    await updatePage.clickNextButton()

    await updatePage.clickIDeclareCheckBox()
});