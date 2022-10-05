import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffHamburgerMenuPage from '../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage';
import DistrictsPage from '../../../pageObjects/studentAdmin/institute/districtsPage';
import AuthoritiesPage from '../../../pageObjects/studentAdmin/institute/authoritiesPage';
import SchoolsPage from '../../../pageObjects/studentAdmin/institute/schoolsPage';

import { idirAdminCredentials, staffLoginUrl } from '../../../config/constants';
import DistrictDetails from '../../../pageObjects/studentAdmin/institute/districtDetails';


const staffLogin = new staffLoginPage();
const menu = new staffHamburgerMenuPage();
const districtsPage = new DistrictsPage();
const districtDetails = new DistrictDetails();

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
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

