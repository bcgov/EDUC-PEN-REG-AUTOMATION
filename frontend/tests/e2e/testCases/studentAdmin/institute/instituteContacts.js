import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage';
import DistrictsPage from '../../../pageObjects/studentAdmin/institute/districtsPage';
import AuthoritiesPage from '../../../pageObjects/studentAdmin/institute/authoritiesPage';
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants';
import DistrictDetails from '../../../pageObjects/studentAdmin/institute/districtDetails';
import AuthoritiesContactsPage from "../../../pageObjects/studentAdmin/institute/authoritiesContactsPage";
import SchoolsPage from '../../../pageObjects/studentAdmin/institute/schoolsPage';
import SchoolContactsPage from "../../../pageObjects/studentAdmin/institute/schoolContactsPage";
import DistrictContactsPage from "../../../pageObjects/studentAdmin/institute/districtContactsPage";

const authoritiesContactsPage = new AuthoritiesContactsPage();
const authoritiesPage = new AuthoritiesPage();
const staffLogin = new staffLoginPage();
const menu = new staffHamburgerMenuPage();
const districtsPage = new DistrictsPage();
const districtDetails = new DistrictDetails();
const schoolsPage = new SchoolsPage();
const schoolContactsPage = new SchoolContactsPage();
const districtContactsPage = new DistrictContactsPage();

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080)
    });

test('Staff view authority contacts test', async () => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  //access district list
  await menu.clickHamburgerMenu();
  await menu.clickInstitutionsMenuOption();
  await menu.clickInstitutionsAuthoritiesLink();

  await authoritiesPage.setName('Automation Testing Authority');
  await authoritiesPage.selectNameOptionByIndex(0);
  await authoritiesPage.clickSearchButton();
  await authoritiesPage.verifyAuthoritySearchResults('Automation Testing Authority');
  await authoritiesPage.clickAuthorityContacts();

  await authoritiesContactsPage.verifyAuthorityNumberAndName('999 - Automation Testing Authority');
  await authoritiesContactsPage.verifyAuthorityTypeLabel();
  await authoritiesContactsPage.verifyAuthorityContactName();
});

test('Staff edit school contact test', async () => {

  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  await menu.clickHamburgerMenu();
  await menu.clickInstitutionsMenuOption();
  await menu.clickInstitutionsSchoolLink();

  const schoolName = 'Automation Testing School';
  await schoolsPage.setName(schoolName);
  await schoolsPage.selectNameOptionByIndex(0);
  await schoolsPage.selectStatus(1);

  await schoolsPage.clickSearchButton();

  await schoolsPage.clickSchoolSearchResultContacts();

  await schoolContactsPage.clickEditContactButton();
  await schoolContactsPage.editSchoolContact();

  await schoolContactsPage.verifySchoolContactDetails();
});

test('Staff view districts contacts test', async () => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  //access district list
  await menu.clickHamburgerMenu();
  await menu.clickInstitutionsMenuOption();
  await menu.clickInstitutionsDistrictLink()

  await districtsPage.setName('Automation Testing District');
  await districtsPage.selectNameOptionByIndex(0);
  await districtsPage.clickSearchButton();
  await districtsPage.verifyDistrictSearchResults('Automation Testing District');
  await districtsPage.clickDistrictContacts();

  await districtContactsPage.verifyDistrictNumberAndName('999 - Automation Testing District');
  await districtContactsPage.verifyDistrictContactTypeLabel();
  await districtContactsPage.verifyDistrictContactName();

});