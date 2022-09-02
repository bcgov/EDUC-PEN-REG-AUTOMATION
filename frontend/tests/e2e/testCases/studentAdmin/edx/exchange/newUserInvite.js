import staffLoginPage from '../../../../pageObjects/login/staffLoginPage'
import staffHamburgerMenuPage from '../../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import accessPage from '../../../../pageObjects/studentAdmin/exchange/accessManagement/accessPage'
import accessUsersPage from '../../../../pageObjects/studentAdmin/exchange/accessManagement/accessUsersPage'

import { idirAdminCredentials, staffLoginUrl } from '../../../../config/constants'
import newUserPage from "../../../../pageObjects/studentAdmin/exchange/accessManagement/newUserPage";


const staffLogin = new staffLoginPage();
const menu = new staffHamburgerMenuPage();
const access = new accessPage();
const accessUsers = new accessUsersPage();
const newUserInvitePage = new newUserPage();

fixture`New_User_Invite`
  .page(staffLoginUrl)
  .beforeEach(async t => {
    await t.maximizeWindow()
  });

test('Staff_Add_New_User_Edx_Invite', async t => {

  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  //access the access management page
  await menu.clickHamburgerMenu();
  await menu.clickAdministrationMenuOption();
  await menu.clickEDXSchoolAccessMenuLink();

  //select school option
  await access.setInstituteName('wildflower');
  await access.selectInstituteNameOptionByIndex(0);
  await access.clickManageInstituteButton();

  //click New User and Enter Details and Invite
  await accessUsers.clickNewUserButton();
  await t.expect(accessUsers.vCardTitle.innerText).contains('New User');
  await newUserInvitePage.verifyAccessAndUserInviteOperation();

});
