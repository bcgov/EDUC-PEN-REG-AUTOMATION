import staffHamburgerMenuPage from '../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage';
import AuthoritiesPage from '../pageObjects/studentAdmin/institute/authoritiesPage';
import SchoolsPage from '../pageObjects/studentAdmin/institute/schoolsPage';
import DistrictsPage from '../pageObjects/studentAdmin/institute/districtsPage';

const menu = new staffHamburgerMenuPage();
const authoritiesPage = new AuthoritiesPage();
const schoolsPage = new SchoolsPage();
const districtsPage = new DistrictsPage();

const log = require("npmlog");

const navigationUtils = {

    async navigateToAuthorityContacts(){
        await menu.clickHamburgerMenu();
        await menu.clickInstitutionsMenuOption();
        await menu.clickInstitutionsAuthoritiesLink();

        await authoritiesPage.setName('Automation Testing Authority');
        await authoritiesPage.selectNameOptionByIndex(0);
        await authoritiesPage.clickSearchButton();
        await authoritiesPage.verifyAuthoritySearchResults('Automation Testing Authority');
        await authoritiesPage.clickAuthorityContacts();
    },

    async navigateToSchoolContacts(){
        await menu.clickHamburgerMenu();
        await menu.clickInstitutionsMenuOption();
        await menu.clickInstitutionsSchoolLink();

        const schoolName = 'Automation Testing School';
        await schoolsPage.setName(schoolName);
        await schoolsPage.selectNameOptionByIndex(0);
        await schoolsPage.selectStatus(1);

        await schoolsPage.clickSearchButton();

        await schoolsPage.clickSchoolSearchResultContacts();

    },

    async navigateToDistrictContacts(){
        await menu.clickHamburgerMenu();
        await menu.clickInstitutionsMenuOption();
        await menu.clickInstitutionsDistrictLink()

        await districtsPage.setName('Automation Testing District');
        await districtsPage.selectNameOptionByIndex(0);
        await districtsPage.clickSearchButton();
        await districtsPage.verifyDistrictSearchResults('Automation Testing District');
        await districtsPage.clickDistrictContacts();
    }

};

module.exports = navigationUtils;
