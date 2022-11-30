import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage';
import DistrictsPage from '../../../pageObjects/studentAdmin/institute/districtsPage';
import AuthoritiesPage from '../../../pageObjects/studentAdmin/institute/authoritiesPage';
import SchoolsPage from '../../../pageObjects/studentAdmin/institute/schoolsPage';

import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants';

const staffLogin = new staffLoginPage();
const menu = new staffHamburgerMenuPage();
const districtsPage = new DistrictsPage();
const authoritiesPage = new AuthoritiesPage();
const schoolsPage = new SchoolsPage();

fixture`Institute list`
  .page(staffLoginUrl)
  .beforeEach(async t => {
    await t.resizeWindow(1920, 1080)
  });

test('Staff search districts test', async () => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  //access district list
  await menu.clickHamburgerMenu();
  await menu.clickInstitutionsMenuOption();
  await menu.clickInstitutionsDistrictLink();

  await districtsPage.setName('999 - Automation Testing District');
  await districtsPage.selectNameOptionByIndex(0);
  await districtsPage.clickSearchButton();
  await districtsPage.verifyDistrictSearchResults('999 - Automation Testing District');

});

test('Staff search authorities test', async () => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  //access district list
  await menu.clickHamburgerMenu();
  await menu.clickInstitutionsMenuOption();
  await menu.clickInstitutionsAuthoritiesLink();

  await authoritiesPage.setName('997 - Automation Testing Authority');
  await authoritiesPage.selectNameOptionByIndex(0);
  await authoritiesPage.clickSearchButton();
  await authoritiesPage.verifyAuthoritySearchResults('997 - Automation Testing Authority');

  await authoritiesPage.clickClearButton();
  await authoritiesPage.setName('997 - Automation Testing Authority');
  await authoritiesPage.selectNameOptionByIndex(0);
  await authoritiesPage.selectAuthorityType('Independent');
  await authoritiesPage.clickSearchButton();
  await authoritiesPage.verifyAuthoritySearchResults('997 - Automation Testing Authority');
});

test('Staff search schools test', async () => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  await menu.clickHamburgerMenu();
  await menu.clickInstitutionsMenuOption();
  await menu.clickInstitutionsSchoolLink();

  await schoolsPage.setName('99999999 - Automation Testing School');
  await schoolsPage.selectNameOptionByIndex(0);
  await schoolsPage.selectStatus(1);

  await schoolsPage.clickSearchButton();
  await schoolsPage.verifySchoolSearchResults('99999999 - Automation Testing School');

});