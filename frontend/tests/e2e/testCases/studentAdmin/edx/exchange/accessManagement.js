import staffLoginPage from '../../../../pageObjects/login/staffLoginPage'
import staffHamburgerMenuPage from '../../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import accessPage from '../../../../pageObjects/studentAdmin/exchange/accessManagement/accessPage'
import accessUsersPage from '../../../../pageObjects/studentAdmin/exchange/accessManagement/accessUsersPage'

import { idirAdminCredentials, staffLoginUrl } from '../../../../config/constants'


const staffLogin = new staffLoginPage();
const menu = new staffHamburgerMenuPage();
const access = new accessPage();
const accessUsers = new accessUsersPage();


fixture`Student Admin`
.page(staffLoginUrl)
.beforeEach(async t => {
  await t.maximizeWindow()
});

test('Staff view Pen inbox navigation test', async t => {

  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  //access the access management page
  await menu.clickHamburgerMenu();
  await menu.clickAdministrationMenuOption();
  await menu.clickAccessManagementMenuLink();

  //select school option
  await access.setSchoolName('wildflower');
  await access.selectSchoolNameOptionByIndex(0);
  await access.clickManageSchoolButton();

  //verify user access exists
  await accessUsers.setName('automation tester');
  await accessUsers.clickSearchButton();
  await accessUsers.verifyUserAccessAndSearchResults();
});
