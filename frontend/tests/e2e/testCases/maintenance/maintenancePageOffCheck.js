import studentLoginPage from '../../pageObjects/login/studentLoginPage';
import { studentProfileUrl } from '../../config/constants';


const studentLogin = new studentLoginPage()

fixture`Maintenance`
    .page(studentProfileUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Bceid Login and verify Maintenance Page is Off test', async t => {

    await studentLogin.verifyMaintenancePageNotOccurred()

});