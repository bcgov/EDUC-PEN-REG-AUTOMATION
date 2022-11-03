import studentLoginPage from '../../pageObjects/login/studentLoginPage';
import { studentProfileUrl } from '../../config/constants';


const studentLogin = new studentLoginPage()

fixture`Maintenance`
    .page(studentProfileUrl)
    .beforeEach(async t => {
      await t.resizeWindow(1920, 1080)
    })

test('Bceid Login and verify Maintenance Page is On test', async t => {

    await studentLogin.verifyMaintenancePageOccurred()

});