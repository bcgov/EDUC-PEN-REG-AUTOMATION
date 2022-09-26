import { Selector, t } from 'testcafe'
const log = require('npmlog')

class AccessDistrictUsersPage {
    constructor() {
        //text fields
        this.searchName = Selector('#name-text-field');

        //buttons
        this.searchButton = Selector('#user-search-button');
        this.newUserBtn = Selector('#new-user-button');
        this.navTitle = Selector('#navTitle');
        this.newUserVCard= Selector('#newUserInviteVCard');
        this.vCardTitle = Selector(('#newUserInviteVCardTitle'));
    }

    async setName(name) {
        await t.typeText(this.searchName, name);
        log.info(`name text entered`);
    }

    async clickSearchButton() {
        await t.click(this.searchButton);
        log.info(`search button clicked`);
    }
    async clickNewUserButton(){
        await t.click(this.newUserBtn);
        log.info(`New User button clicked`);
    }

    async verifyUserAccessAndSearchResults() {
        await t.expect((Selector('.v-card .v-card__title').withText('automationdistrictuser tester').count)).eql(1, {timeout: 3000});
        log.info("one user found after search");
        await t.expect(Selector('.v-card .v-card__title').innerText).contains('automationdistrictuser tester');
        log.info("correct user found")
        await t.expect(Selector('.v-card .v-card__text').innerText).eql('EDX District Administrator');
        log.info("permissions verified for user");
        log.info("user access permissions and search results verified");
    }

    async confirmNewUserFormOpen() {
       await t.expect(this.vCardTitle.innerText).contains('New User');
    }
}

export default AccessDistrictUsersPage
