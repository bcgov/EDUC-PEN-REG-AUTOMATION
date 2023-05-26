import staffHamburgerMenuPage from '../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage';
import AuthoritiesPage from '../pageObjects/studentAdmin/institute/authoritiesPage';
import SchoolsPage from '../pageObjects/studentAdmin/institute/schoolsPage';
import DistrictsPage from '../pageObjects/studentAdmin/institute/districtsPage';
import SchoolDetailsPage from "../pageObjects/studentAdmin/institute/schoolDetailsPage";

const menu = new staffHamburgerMenuPage();
const authoritiesPage = new AuthoritiesPage();
const schoolsPage = new SchoolsPage();
const districtsPage = new DistrictsPage();
const schoolDetailPage = new SchoolDetailsPage();

const log = require("npmlog");

const navigationUtils = {

    async navigateToAuthorityContacts(authorityName){
        await menu.clickHamburgerMenu();
        await menu.clickInstitutionsMenuOption();
        await menu.clickInstitutionsAuthoritiesLink();

        await authoritiesPage.setName(authorityName);
        await authoritiesPage.selectNameOptionByIndex(0);
        await authoritiesPage.clickSearchButton();
        await authoritiesPage.verifyAuthoritySearchResults(authorityName);
        await authoritiesPage.clickAuthorityContacts();
    },

    async navigateToSchoolContacts(schoolName){
        await menu.clickHamburgerMenu();
        await menu.clickInstitutionsMenuOption();
        await menu.clickInstitutionsSchoolLink();

        await schoolsPage.setName(schoolName);
        await schoolsPage.selectNameOptionByIndex(0);
        await schoolsPage.selectStatus(1);

        await schoolsPage.clickSearchButton();
        await schoolsPage.clickSchoolSearchResult();

        await schoolDetailPage.clickTab("Contacts");
    },

    async navigateToDistrictContacts(districtName){
        await menu.clickHamburgerMenu();
        await menu.clickInstitutionsMenuOption();
        await menu.clickInstitutionsDistrictLink()

        await districtsPage.setName(districtName);
        await districtsPage.selectNameOptionByIndex(0);
        await districtsPage.clickSearchButton();
        await districtsPage.verifyDistrictSearchResults(districtName);
        await districtsPage.clickDistrictContacts();
    }

};

module.exports = navigationUtils;
