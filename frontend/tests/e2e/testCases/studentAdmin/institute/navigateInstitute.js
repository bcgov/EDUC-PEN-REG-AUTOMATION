import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage';
import DistrictsPage from '../../../pageObjects/studentAdmin/institute/districtsPage';

import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants';


const staffLogin = new staffLoginPage();
const menu = new staffHamburgerMenuPage();
const districtsPage = new DistrictsPage();


fixture`Student Admin`
.page(staffLoginUrl)
.beforeEach(async t => {
  await t.maximizeWindow()
});

test('Staff view institutes test', async () => {

  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  //access district list
  await menu.clickHamburgerMenu();
  await menu.clickInstitutionsMenuOption();
  await menu.clickInstitutionsDistrictLink();

  await districtsPage.setName('arrow');
  await districtsPage.selectNameOptionByIndex(0);
  await districtsPage.clickSearchButton();
  await districtsPage.verifyDistrictSearchResults();

});

