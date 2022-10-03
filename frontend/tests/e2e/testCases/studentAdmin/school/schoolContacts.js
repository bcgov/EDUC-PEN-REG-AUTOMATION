import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage';
import SchoolsPage from '../../../pageObjects/studentAdmin/institute/schoolsPage';

import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants';


const staffLogin = new staffLoginPage();
const menu = new staffHamburgerMenuPage();
const schoolsPage = new SchoolsPage();


fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
    });

test('Staff view school contacts test', async () => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

    await menu.clickHamburgerMenu();
    await menu.clickInstitutionsMenuOption();
    await menu.clickInstitutionsSchoolLink();

    await schoolsPage.setName('Mount Baker Secondary');
    await schoolsPage.selectNameOptionByIndex(1);
    await schoolsPage.selectStatus(1);

    await schoolsPage.clickSearchButton();
    await schoolsPage.verifySchoolSearchResults();

});


