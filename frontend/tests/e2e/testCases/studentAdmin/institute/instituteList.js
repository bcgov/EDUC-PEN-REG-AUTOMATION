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

fixture`Student Admin`
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

  await districtsPage.setName('arrow');
  await districtsPage.selectNameOptionByIndex(0);
  await districtsPage.clickSearchButton();
  await districtsPage.verifyDistrictSearchResults('Arrow Lakes');

});

test('Staff search authorities test', async () => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  //access district list
  await menu.clickHamburgerMenu();
  await menu.clickInstitutionsMenuOption();
  await menu.clickInstitutionsAuthoritiesLink();

  await authoritiesPage.setName('agassiz');
  await authoritiesPage.selectNameOptionByIndex(0);
  await authoritiesPage.clickSearchButton();
  await authoritiesPage.verifyAuthoritySearchResults('Agassiz Christian School Society');

  await authoritiesPage.clickClearButton();
  await authoritiesPage.selectStatus('Open');
  await authoritiesPage.setName('Haahuupayak');
  await authoritiesPage.selectNameOptionByIndex(0);
  await authoritiesPage.clickSearchButton();
  await authoritiesPage.verifyAuthoritySearchResults('Haahuupayak Society');

  await authoritiesPage.clickClearButton();
  await authoritiesPage.selectStatus('Closed');
  await authoritiesPage.selectAuthorityType('Independent');
  await authoritiesPage.setName('Hands On');
  await authoritiesPage.selectNameOptionByIndex(0);
  await authoritiesPage.clickSearchButton();
  await authoritiesPage.verifyAuthoritySearchResults('Hands On Summer Camp Society');
});

test('Staff search schools test', async () => {
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