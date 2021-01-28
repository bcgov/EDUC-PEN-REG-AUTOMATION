import penWebPage from '../../pageObjects/penWeb/penWebPage'
import {penWebCredentials, penWebUrl} from '../../config/constants'

const penweb = new penWebPage()


fixture`School Login and submit batch file`
    .page(penWebUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('School Login and submit batch file test', async t => {

    await penweb.penWebLogin(penWebCredentials)

    await penweb.clickSubmitPenRequestLink()

});