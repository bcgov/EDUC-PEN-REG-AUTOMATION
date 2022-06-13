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
        this.administrationMenuOption = Selector('#AdministrationMenuBtn')
        this.accessManagementMenuLink = Selector('#AccessManagementMenuBtn')
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

    async clickAdministrationMenuOption(){
        await t.click(this.administrationMenuOption)
        log.info("Administration menu option is clicked")
    }

    async clickAccessManagementMenuLink(){
        await t.click(this.accessManagementMenuLink)
        log.info("Administrative access management link is clicked")
    }

} export default staffHamburgerMenuPage