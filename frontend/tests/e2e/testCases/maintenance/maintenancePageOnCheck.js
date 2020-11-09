import studentLoginPage from '../../pageObjects/login/studentLoginPage';
import { studentProfileUrl } from '../../config/constants';


const studentLogin = new studentLoginPage()

fixture`Bceid Login and verify Maintenance Page is On`
    .page(studentProfileUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Bceid Login and verify Maintenance Page is On test', async t => {

    await studentLogin.verifyMaintenancePageOccurred()

});