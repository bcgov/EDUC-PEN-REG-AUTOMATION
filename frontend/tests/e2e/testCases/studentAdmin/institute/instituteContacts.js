import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage';
import DistrictsPage from '../../../pageObjects/studentAdmin/institute/districtsPage';
import AuthoritiesPage from '../../../pageObjects/studentAdmin/institute/authoritiesPage';
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants';
import DistrictDetails from '../../../pageObjects/studentAdmin/institute/districtDetails';
import AuthoritiesContactsPage from "../../../pageObjects/studentAdmin/institute/authoritiesContactsPage";
import SchoolsPage from '../../../pageObjects/studentAdmin/institute/schoolsPage';
import SchoolContactsPage from "../../../pageObjects/studentAdmin/institute/schoolContactsPage";
import { setupSchoolPrincipal, teardownSchoolPrincipal, getSchoolPrincipalDetails } from '../../../helpers/schoolUtils';

const authoritiesContactsPage = new AuthoritiesContactsPage();
const authoritiesPage = new AuthoritiesPage();
const staffLogin = new staffLoginPage();
const menu = new staffHamburgerMenuPage();
const districtsPage = new DistrictsPage();
const districtDetails = new DistrictDetails();
const schoolsPage = new SchoolsPage();
const schoolContactsPage = new SchoolContactsPage();

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    });

test('Staff view authority contacts test', async () => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  //access district list
  await menu.clickHamburgerMenu();
  await menu.clickInstitutionsMenuOption();
  await menu.clickInstitutionsAuthoritiesLink();

  await authoritiesPage.setName('agassiz');
  await authoritiesPage.selectNameOptionByIndex(0);
  await authoritiesPage.clickSearchButton();
  await authoritiesPage.verifyAuthoritySearchResults('Agassiz Christian School Society');
  await authoritiesPage.clickAuthorityContacts();

  await authoritiesContactsPage.verifyAuthorityNumberAndName('101 - Agassiz Christian School Society');
  await authoritiesContactsPage.verifyAuthorityTypeLabel();
  await authoritiesContactsPage.verifyAuthorityContactName();
});

test('Staff edit school contact test', async () => {

  let newPrincipal = await setupSchoolPrincipal();
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  await menu.clickHamburgerMenu();
  await menu.clickInstitutionsMenuOption();
  await menu.clickInstitutionsSchoolLink();

  const schoolName = 'Mount Baker Secondary';
  await schoolsPage.setName(schoolName);
  await schoolsPage.selectNameOptionByIndex(1);
  await schoolsPage.selectStatus(1);

  await schoolsPage.clickSearchButton();

  await schoolsPage.clickSchoolSearchResultContacts();
  await schoolContactsPage.verifySchoolContactDetails(newPrincipal);

  await schoolContactsPage.clickEditContactButton();
  await schoolContactsPage.editSchoolContact();

  let updatedPrincipal = await getSchoolPrincipalDetails('02001');
  await schoolContactsPage.verifySchoolContactDetails(updatedPrincipal);

  await teardownSchoolPrincipal(newPrincipal.schoolContactId);
});