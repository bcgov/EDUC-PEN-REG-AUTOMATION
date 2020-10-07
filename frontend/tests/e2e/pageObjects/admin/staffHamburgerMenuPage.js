import { Selector, t } from 'testcafe'
const log = require('npmlog')

class staffHamburgerMenuPage {

    constructor() {

        this.hamburgerMenuButton = Selector('#menuBtn')
        this.dashboardLink = Selector('#DashboardMenuBtn')
    }

    async clickHamburgerMenu(){
        await t.click(this.hamburgerMenuButton)
        log.info("Hamburger menu button is clicked")
    }

    async clickDashboardLink(){
        await t.click(this.dashboardLink)
        log.info("Dashboard link is clicked")
    }

} export default staffHamburgerMenuPage