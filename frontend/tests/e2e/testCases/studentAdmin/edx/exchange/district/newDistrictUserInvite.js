import staffLoginPage from '../../../../../pageObjects/login/staffLoginPage'
import staffHamburgerMenuPage from '../../../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import accessPage from '../../../../../pageObjects/studentAdmin/exchange/accessManagement/accessPage'

import { idirAdminCredentials, staffLoginUrl } from '../../../../../config/constants'
import newUserPage from "../../../../../pageObjects/studentAdmin/exchange/accessManagement/newUserPage";
import accessDistrictUsersPage
  from "../../../../../pageObjects/studentAdmin/exchange/accessManagement/district/accessDistrictUsersPage";


const staffLogin = new staffLoginPage();
const menu = new staffHamburgerMenuPage();
const access = new accessPage();
const accessUsers = new accessDistrictUsersPage();
const newUserInvitePage = new newUserPage();

fixture`New_User_Invite`
  .page(staffLoginUrl)
  .beforeEach(async t => {
    await t.resizeWindow(1920, 1080)
  });

test('Staff view and Manage A District And Invite A new District User', async () => {

  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  //access the access management page
  await menu.clickHamburgerMenu();
  await menu.clickAdministrationMenuOption();
  await menu.clickEDXDistrictAccessMenuLink();

  //select district option
  await access.setInstituteName('Automation Testing District - 999');
  await access.selectInstituteNameOptionByIndex(0);
  await access.clickManageInstituteButton();

  //click New User and Enter Details and Invite
  await accessUsers.clickNewUserButton();
  await accessUsers.confirmNewUserFormOpen();
  await newUserInvitePage.verifyAccessAndUserInviteOperation('EDX District Administrator');

});
