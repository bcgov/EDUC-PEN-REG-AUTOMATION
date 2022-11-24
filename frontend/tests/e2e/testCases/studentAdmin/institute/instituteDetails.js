import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage';
import DistrictsPage from '../../../pageObjects/studentAdmin/institute/districtsPage';
import SchoolsPage from '../../../pageObjects/studentAdmin/institute/schoolsPage';
import SchoolDetailsPage from "../../../pageObjects/studentAdmin/institute/schoolDetailsPage";
import AuthoritiesPage from '../../../pageObjects/studentAdmin/institute/authoritiesPage';
import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants';
import DistrictDetails from '../../../pageObjects/studentAdmin/institute/districtDetails';
import AuthoritiesDetailsPage from "../../../pageObjects/studentAdmin/institute/authoritiesDetailsPage";
import crypto from 'crypto';

const authoritiesDetailsPage = new AuthoritiesDetailsPage();
const authoritiesPage = new AuthoritiesPage();

const staffLogin = new staffLoginPage();
const menu = new staffHamburgerMenuPage();
const districtsPage = new DistrictsPage();
const districtDetails = new DistrictDetails();
const schoolsPage = new SchoolsPage();
const schoolDetailsPage = new SchoolDetailsPage();

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.resizeWindow(1920, 1080)
    });

test('Staff view districts details test', async () => {
    const districtName = 'Rocky';
    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

    //access district list
    await menu.clickHamburgerMenu();
    await menu.clickInstitutionsMenuOption();
    await menu.clickInstitutionsDistrictLink();

    await districtsPage.setName(districtName);
    await districtsPage.selectNameOptionByIndex(0);
    await districtsPage.clickSearchButton();
    await districtsPage.verifyDistrictSearchResults(districtName);
    await districtsPage.clickDistrictSearchResult(districtName);
    await districtDetails.verifyDistrictDetailsPage(districtName);
});

test('Staff view authority details test', async () => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  //access district list
  await menu.clickHamburgerMenu();
  await menu.clickInstitutionsMenuOption();
  await menu.clickInstitutionsAuthoritiesLink();

  await authoritiesPage.setName('agassiz');
  await authoritiesPage.selectNameOptionByIndex(0);
  await authoritiesPage.clickSearchButton();
  await authoritiesPage.verifyAuthoritySearchResults('Agassiz Christian School Society');
  await authoritiesPage.clickAuthorityDetails();

  await authoritiesDetailsPage.verifyAuthorityNumberAndName('101 - Agassiz Christian School Society');
});

test('Staff edit authority details test', async () => {
    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

    //access district list
    await menu.clickHamburgerMenu();
    await menu.clickInstitutionsMenuOption();
    await menu.clickInstitutionsAuthoritiesLink();

    await authoritiesPage.setName('Automation Testing Authority');
    await authoritiesPage.selectNameOptionByIndex(1);
    await authoritiesPage.clickSearchButton();
    await authoritiesPage.verifyAuthoritySearchResults('Automation Testing Authority');
    await authoritiesPage.clickAuthorityDetails();

    await authoritiesDetailsPage.verifyAuthorityNumberAndName('999 - Automation Testing Authority');

    await authoritiesDetailsPage.clickEditAuthorityButton();
    await authoritiesDetailsPage.editAuthorityDetails();
    await authoritiesDetailsPage.clickSaveAuthorityEditButton();

    await authoritiesDetailsPage.verifyAuthorityPhoneNumber('101-101-1100');
    await authoritiesDetailsPage.verifyAuthorityEmailAddress('test2@test.com');

});

test('Staff view school details test', async () => {
    const schoolName = 'Mount Baker Secondary';
    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

    await menu.clickHamburgerMenu();
    await menu.clickInstitutionsMenuOption();
    await menu.clickInstitutionsSchoolLink();

    await schoolsPage.setName(schoolName);
    await schoolsPage.selectNameOptionByIndex(1);
    await schoolsPage.selectStatus(1);

    await schoolsPage.clickSearchButton();

    await schoolsPage.clickSchoolSearchResult();

    await schoolDetailsPage.verifySchoolDetails();

});

test('Add a note to a school', async () => {
    //Navigate to a school details page.
    const schoolName = 'Mount Baker Secondary';
    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

    await menu.clickHamburgerMenu();
    await menu.clickInstitutionsMenuOption();
    await menu.clickInstitutionsSchoolLink();

    await schoolsPage.setName(schoolName);
    await schoolsPage.selectNameOptionByIndex(1);
    await schoolsPage.selectStatus(1);
    await schoolsPage.clickSearchButton();
    await schoolsPage.clickSchoolSearchResult();

    //Verify the initial school notes timeline state.
    await schoolDetailsPage.verifySchoolNotesTimelineExists();
    await schoolDetailsPage.verifyAddNewNoteButtonExists();
    await schoolDetailsPage.verifyAddNewNoteButtonEnabled();
    await schoolDetailsPage.verifyNewNoteSheetDoesNotExist();

    //Verify the initial new note form state.
    await schoolDetailsPage.clickAddNewNoteButton();
    await schoolDetailsPage.verifyNewNoteSheetExists();
    await schoolDetailsPage.verifyNewNoteTextAreaExists();
    await schoolDetailsPage.verifyCancelNewNoteButtonExists();
    await schoolDetailsPage.verifySaveNewNoteButtonExists();
    await schoolDetailsPage.verifyCancelNewNoteButtonEnabled();
    await schoolDetailsPage.verifySaveNewNoteButtonDisabled();

    //Verify that the cancel button works.
    await schoolDetailsPage.clickCancelNewNoteButton();
    await schoolDetailsPage.verifyNewNoteSheetDoesNotExist();

    //Verify interactions with the new note form.
    const noteMessage = `Placed by an automated test of adding a note to a school. ${crypto.randomUUID()}`;
    await schoolDetailsPage.clickAddNewNoteButton();
    await schoolDetailsPage.verifyNewNoteSheetExists();
    await schoolDetailsPage.verifySaveNewNoteButtonDisabled();

    //Verify that the save button enables when text is entered.
    await schoolDetailsPage.setNewNoteTextAreaText(noteMessage);
    await schoolDetailsPage.verifySaveNewNoteButtonEnabled();

    //Verify saving a new note.
    await schoolDetailsPage.setNewNoteTextAreaText(noteMessage);
    await schoolDetailsPage.verifySaveNewNoteButtonEnabled();
    await schoolDetailsPage.clickSaveNewNoteButton();

    //Verify that the note has been added.
    await schoolDetailsPage.verifyNewNoteSheetDoesNotExist();
    await schoolDetailsPage.verifySchoolNotesTimelineContainsItemWithText(noteMessage);

    //Verify that the form has been reset after saving a new note.
    await schoolDetailsPage.clickAddNewNoteButton();
    await schoolDetailsPage.verifyNewNoteSheetExists();
    await schoolDetailsPage.verifyNewNoteTextAreaText('');
    await schoolDetailsPage.verifySaveNewNoteButtonDisabled();
});