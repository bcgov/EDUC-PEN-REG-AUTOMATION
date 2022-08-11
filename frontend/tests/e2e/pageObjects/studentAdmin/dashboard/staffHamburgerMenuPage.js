import { Selector, t } from 'testcafe'
const log = require('npmlog')

class staffHamburgerMenuPage {

    constructor() {

        this.hamburgerMenuButton = Selector('#menuBtn')
        this.dashboardLink = Selector('#DashboardMenuBtn')
        this.studentSearchLink = Selector('#StudentSearchMenuBtn')
        this.infrequentProcessLink = Selector('#InfrequentProcessesMenuBtn')
        this.createNewPenLink = Selector('#CreateNewPENMenuBtn')
        this.comparePensLink = Selector('#CompareStudentsMenuBtn')
        this.edxInboxMenuOption = Selector('#SecureMessagingInboxMenuBtn');
        this.edxPenTeamInboxLink = Selector('#PENTeamInboxMenuBtn');
        this.administrationMenuOption = Selector('#AdministrationMenuBtn')
        this.edxAccessMenuLink = Selector('#EDXAccessMenuBtn')
    }

    async clickHamburgerMenu(){
        await t.click(this.hamburgerMenuButton)
        log.info("Hamburger menu button is clicked")
    }

    async clickDashboardLink(){
        await t.click(this.dashboardLink)
        log.info("Dashboard link is clicked")
    }

    async clickStudentSearchLink(){
        await t.click(this.studentSearchLink)
        log.info("Student search link clicked")
    }

    async clickInfrequentProcessLink(){
        await t.click(this.infrequentProcessLink)
        log.info("Infrequent link is clicked")
    }

    async clickCreateNewPenLink(){
        await t.click(this.createNewPenLink)
        log.info("Create new pen link is clicked")
    }

    async clickComparePensLink(){
        await t.click(this.comparePensLink)
        log.info("Compare pens link is clicked")
    }

    async verifyEdxInboxMenuOptionIsAvailable() {
        await t.expect(this.edxInboxMenuOption.exists).ok();
        log.info("Verified EDX Inbox menu option exists.");
    }

    async verifyEdxPenTeamInboxLinkIsAvailable() {
        await t.expect(this.edxPenTeamInboxLink.exists).ok();
        log.info("Verified EDX PEN Team Inbox link exists.");
    }

    async verifyEdxInboxMenuOptionIsNotAvailable() {
        await t.expect(this.edxInboxMenuOption.exists).notOk();
        log.info("Verified EDX Inbox menu option does not exists.");
    }

    async verifyEdxPenTeamInboxLinkIsNotAvailable() {
        await t.expect(this.edxPenTeamInboxLink.exists).notOk();
        log.info("Verified EDX PEN Team Inbox link does not exists.");
    }

    async clickEdxInboxMenuOption() {
        await t.click(this.edxInboxMenuOption);
        log.info('Clicked the EDX Inbox menu option.');
    }

    async clickEdxPenTeamInboxLink() {
        await t.click(this.edxPenTeamInboxLink);
        log.info('Clicked the EDX PEN Team Inbox link.');
    }

    async clickAdministrationMenuOption(){
        await t.click(this.administrationMenuOption)
        log.info("Administration menu option is clicked")
    }

    async clickEDXAccessMenuLink(){
        await t.click(this.edxAccessMenuLink)
        log.info("Administrative EDX management link is clicked")
    }

} export default staffHamburgerMenuPage
