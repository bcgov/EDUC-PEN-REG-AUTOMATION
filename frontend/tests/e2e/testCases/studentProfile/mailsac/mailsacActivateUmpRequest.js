import mailsacPage from '../../../pageObjects/mailsac/mailsacPage'
import { mailsacUrl, mailsacCredentials, pen_environment } from '../../../config/constants'
import studentData from '../../../config/studentData/studentData.json'


const mailsac = new mailsacPage()


fixture`mailsac activate UMP request`
    .page(mailsacUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('mailsac activate UMP request test', async t => {

    await mailsac.mailsacLogin(mailsacCredentials)

    await mailsac.clickSubmitButton()

    await mailsac.setMyInboxTextBox(studentData.umpEmail,pen_environment)

    await mailsac.clickCheckTheEmailButton()

    await mailsac.activateUmpRequest(true)

    await mailsac.confirmEmailVerified(studentData.umpEmailVerificationText)

});