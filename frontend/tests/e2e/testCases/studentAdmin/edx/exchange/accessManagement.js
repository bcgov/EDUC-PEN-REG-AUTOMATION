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
  await t.resizeWindow(1920, 1080)
});

test('Staff view Pen inbox access management test', async () => {

  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  //access the access management page
  await menu.clickHamburgerMenu();
  await menu.clickAdministrationMenuOption();
  await menu.clickEDXSchoolAccessMenuLink();

  //select school option
  await access.setInstituteName('wildflower');
  await access.selectInstituteNameOptionByIndex(0);
  await access.clickManageInstituteButton();

  //verify user access exists
  await accessUsers.setName('automation tester');
  await accessUsers.clickSearchButton();
  await accessUsers.verifyUserAccessAndSearchResults();

  //verify Primary EDX Activation Code
  await access.verifyGenerateNewPrimaryEdxActivationCodeDialogDoesNotExist();
  await access.clickToggleGenerateNewPrimaryEdxActivationCodeDialogVisibilityButton();
  await access.verifyGenerateNewPrimaryEdxActivationCodeDialogExists();
  await access.clickToggleGenerateNewPrimaryEdxActivationCodeDialogVisibilityButton();
  await access.verifyGenerateNewPrimaryEdxActivationCodeDialogDoesNotExist();
  await access.clickToggleGenerateNewPrimaryEdxActivationCodeDialogVisibilityButton();
  await access.verifyGenerateNewPrimaryEdxActivationCodeDialogExists();
  await access.clickCloseGenerateNewPrimaryEdxActivationCodeDialogButton();
  await access.verifyGenerateNewPrimaryEdxActivationCodeDialogDoesNotExist();
  await access.clickToggleGenerateNewPrimaryEdxActivationCodeDialogVisibilityButton();
  await access.verifyGenerateNewPrimaryEdxActivationCodeDialogExists();
  await access.clickDoGeneratePrimaryEdxActivationCodeButton();
  await access.verifyGenerateNewPrimaryEdxActivationCodeDialogDoesNotExist()
  await access.verifyPrimaryEdxActivationCodeChanged();

  await access.verifyCopyPrimaryEdxActivationCodeButtonExists();
  await access.verifyCopyPrimaryEdxActivationCodeButtonValueMatchesPrimaryEdxActivationCode();
});
