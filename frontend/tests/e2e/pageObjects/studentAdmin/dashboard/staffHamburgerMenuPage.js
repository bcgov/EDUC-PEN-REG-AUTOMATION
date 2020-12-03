import { Selector, t } from 'testcafe'
const log = require('npmlog')

class staffHamburgerMenuPage {

    constructor() {

        this.hamburgerMenuButton = Selector('#menuBtn')
        this.dashboardLink = Selector('#DashboardMenuBtn')
        this.infrequentProcessLink = Selector('div').withText('Infrequent Processes')
        this.createNewPenLink = Selector('#CreateNew PENMenuBtn')
    }

    async clickHamburgerMenu(){
        await t.click(this.hamburgerMenuButton)
        log.info("Hamburger menu button is clicked")
    }

    async clickDashboardLink(){
        await t.click(this.dashboardLink)
        log.info("Dashboard link is clicked")
    }

    async clickInfrequentProcessLink(){
        await t.click(this.infrequentProcessLink)
        log.info("Infrequent link is clicked")
    }

    async clickCreateNewPenLink(){
        await t.click(this.createNewPenLink)
        log.info("Create new pen link is clicked")
    }

} export default staffHamburgerMenuPage