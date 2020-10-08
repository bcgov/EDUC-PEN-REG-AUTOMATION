import mailsacPage from '../../pageObjects/mailsac/mailsacPage'
import { mailsacUrl, mailsacCredentials } from '../../config/constants'
import studentData from '../../config/studentData/studentData.json'


const mailsac = new mailsacPage()


fixture`mailsac activate PEN request`
    .page(mailsacUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('mailsac activate PEN request test', async t => {

    await mailsac.mailsacLogin(mailsacCredentials)

    await mailsac.clickSubmitButton()

    await mailsac.setMyInboxTextBox(mailsacCredentials.username)

    await mailsac.clickCheckTheEmailButton()

    await mailsac.activatePenRequest(true)

    await mailsac.confirmEmailVerified(studentData.penEmailVerificationText)

});