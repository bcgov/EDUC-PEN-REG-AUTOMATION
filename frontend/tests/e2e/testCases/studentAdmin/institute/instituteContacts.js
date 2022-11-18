import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants';
import AuthoritiesContactsPage from "../../../pageObjects/studentAdmin/institute/authoritiesContactsPage";
import SchoolContactsPage from "../../../pageObjects/studentAdmin/institute/schoolContactsPage";
import DistrictContactsPage from "../../../pageObjects/studentAdmin/institute/districtContactsPage";
import { navigateToAuthorityContacts, navigateToSchoolContacts, navigateToDistrictContacts } from "../../../helpers/navigationUtils";

const authoritiesContactsPage = new AuthoritiesContactsPage();
const staffLogin = new staffLoginPage();
const schoolContactsPage = new SchoolContactsPage();
const districtContactsPage = new DistrictContactsPage();

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080)
    });

test('Staff view authority contacts test', async () => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  await navigateToAuthorityContacts();

  await authoritiesContactsPage.verifyAuthorityNumberAndName('998 - EDX Automation Testing Authority');

  await authoritiesContactsPage.verifyAuthorityTypeLabel();
  await authoritiesContactsPage.verifyAuthorityContactName();
});

test('Staff edit authority contact test', async () => {

  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  await navigateToAuthorityContacts();

  await authoritiesContactsPage.clickEditContactButton();
  await authoritiesContactsPage.editAuthorityContact();

  await authoritiesContactsPage.verifyAuthorityContactDetails();
});

test('Staff edit school contact test', async () => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  await navigateToSchoolContacts();

  await schoolContactsPage.clickEditContactButton();
  await schoolContactsPage.editSchoolContact();

  await schoolContactsPage.verifySchoolContactDetails();
});

test('Staff view districts contacts test', async () => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  await navigateToDistrictContacts();

  await districtContactsPage.verifyDistrictNumberAndName('999 - Automation Testing District');
  await districtContactsPage.verifyDistrictContactTypeLabel();
  await districtContactsPage.verifyDistrictContactName();

});