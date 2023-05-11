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

  await navigateToAuthorityContacts('Student Admin Automation Testing Authority');

  await authoritiesContactsPage.verifyAuthorityNumberAndName('Student Admin Automation Testing Authority');

  await authoritiesContactsPage.verifyAuthorityTypeLabel();
  await authoritiesContactsPage.verifyAuthorityContactName();
});

test('Staff edit authority contact test', async () => {

  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  await navigateToAuthorityContacts('Student Admin Automation Testing Authority');

  await authoritiesContactsPage.clickEditContactButton();
  await authoritiesContactsPage.editAuthorityContact();

  await authoritiesContactsPage.verifyAuthorityContactDetails();
});

test('Staff edit school contact test', async () => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  await navigateToSchoolContacts('9999999 - Automation Testing School');

  await schoolContactsPage.clickEditContactButton();
  await schoolContactsPage.verifyEditSchoolContactCardExists();
  await schoolContactsPage.editSchoolContact();
  await schoolContactsPage.verifyEditSchoolContactCardDoesNotExist();
  await schoolContactsPage.verifySchoolContactDetails();
});

test('Staff view districts contacts test', async () => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  await navigateToDistrictContacts('999 - Automation Testing District');

  await districtContactsPage.verifyDistrictNumberAndName('999 - Automation Testing District');
  await districtContactsPage.verifyDistrictContactTypeLabel();
  await districtContactsPage.verifyDistrictContactName();

});