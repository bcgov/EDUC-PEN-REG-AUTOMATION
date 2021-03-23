import mailsacPage from '../../../pageObjects/mailsac/mailsacPage'
import { mailsacUrl, mailsacCredentials, pen_environment } from '../../../config/constants'
import studentData from '../../../config/studentData/studentData.json'


const mailsac = new mailsacPage()


fixture`Mailsac`
    .page(mailsacUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('mailsac activate PEN request test', async t => {

    await mailsac.mailsacLogin(mailsacCredentials)

    await mailsac.clickSubmitButton()

    await mailsac.setMyInboxTextBox(studentData.email,pen_environment)

    await mailsac.clickCheckTheEmailButton()

    await mailsac.activatePenRequest(true)

    await mailsac.confirmEmailVerified(studentData.penEmailVerificationText)

});