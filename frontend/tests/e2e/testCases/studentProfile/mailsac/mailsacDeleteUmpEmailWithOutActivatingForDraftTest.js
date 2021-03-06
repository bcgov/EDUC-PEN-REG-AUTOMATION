import mailsacPage from '../../../pageObjects/mailsac/mailsacPage'
import { mailsacUrl, mailsacCredentials,pen_environment } from '../../../config/constants'
import studentData from '../../../config/studentData/studentData.json'

const mailsac = new mailsacPage()


fixture`mailsac Delete email with out activating`
    .page(mailsacUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('mailsac Delete email with out activating test', async t => {

    await mailsac.mailsacLogin(mailsacCredentials)

    await mailsac.clickSubmitButton()

    await mailsac.setMyInboxTextBox(studentData.umpEmail,pen_environment)

    await mailsac.clickCheckTheEmailButton()

    await mailsac.activateUmpRequest(false)

});