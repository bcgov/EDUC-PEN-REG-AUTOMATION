import { Selector, t } from 'testcafe'
const log = require('npmlog')

class staffDashboardPage {

    constructor() {


        //Dashboard related
        this.viewGmpButton = Selector('#GetMyPENBtn')
        this.viewUmpButton = Selector('#UpdateMyPENBtn')
        this.penNumberInput = Selector('#penTextField')
        this.quickSearchButton = Selector('#quickSearchBtn')
        this.fullSearchButton = Selector('span').withText('Advanced Student Search')

    }

    async maximizeWindow() {
        await t.maximizeWindow()
        log.info("Window maximized")
    }

    async clickViewGmpButton() {
        await t.wait(5000)
        await t.click(this.viewGmpButton)
        log.info("View GMP button is clicked")
    }

    async clickViewUmpButton() {
        await t.wait(5000)
        await t.click(this.viewUmpButton)
        log.info("View UMP button is clicked")
    }

    async setPenNumber(data) {
        await t.typeText(this.penNumberInput, data)
        log.info("Pen number is entered")        
    }

    async clickQuickSearchButton() {
        await t.click(this.quickSearchButton)
        log.info("Quick search button is clicked")
    }

    async clickFullSearchButton() {
        await t.click(this.fullSearchButton)
        log.info("Full search button is clicked")
    }
}

export default staffDashboardPage