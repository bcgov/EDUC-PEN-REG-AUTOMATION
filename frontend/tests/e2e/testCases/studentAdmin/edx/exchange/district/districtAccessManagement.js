import staffLoginPage from '../../../../../pageObjects/login/staffLoginPage'
import staffHamburgerMenuPage from '../../../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage'
import accessPage from '../../../../../pageObjects/studentAdmin/exchange/accessManagement/accessPage'

import { idirAdminCredentials, staffLoginUrl } from '../../../../../config/constants'
import accessDistrictUsersPage
    from "../../../../../pageObjects/studentAdmin/exchange/accessManagement/district/accessDistrictUsersPage";
import newUserPage from "../../../../../pageObjects/studentAdmin/exchange/accessManagement/newUserPage";


const staffLogin = new staffLoginPage();
const newUserInvitePage = new newUserPage();
const menu = new staffHamburgerMenuPage();
const access = new accessPage();
const accessUsers = new accessDistrictUsersPage();


fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    });

test('Staff view Edx District Access And Manage A District', async () => {

    await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

    //access the access management page
    await menu.clickHamburgerMenu();
    await menu.clickAdministrationMenuOption();
    await menu.clickEDXDistrictAccessMenuLink();

    //select district option
    await access.setInstituteName('Rocky Mountain');
    await access.selectInstituteNameOptionByIndex(0);
    await access.clickManageInstituteButton();

    //verify user access exists
    await accessUsers.setName('automationdistrictuser');
    await accessUsers.clickSearchButton();
    await accessUsers.verifyUserAccessAndSearchResults();

});

