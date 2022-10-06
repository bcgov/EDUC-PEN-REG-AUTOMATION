import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage';
import DistrictsPage from '../../../pageObjects/studentAdmin/institute/districtsPage';
import AuthoritiesPage from '../../../pageObjects/studentAdmin/institute/authoritiesPage';
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants';
import DistrictDetails from '../../../pageObjects/studentAdmin/institute/districtDetails';
import AuthoritiesContactsPage from "../../../pageObjects/studentAdmin/institute/authoritiesContactsPage";

const authoritiesContactsPage = new AuthoritiesContactsPage();
const authoritiesPage = new AuthoritiesPage();
const staffLogin = new staffLoginPage();
const menu = new staffHamburgerMenuPage();
const districtsPage = new DistrictsPage();
const districtDetails = new DistrictDetails();

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

