import { Selector, t } from 'testcafe'
const log = require('npmlog')

class staffDashboardPage {

    constructor() {


        //GUmpi related
        this.viewGmpButton = Selector('#GetMyPENBtn')
        this.viewUmpButton = Selector('#UpdateMyPENBtn')

        //Search related
        this.penNumberInput = Selector('#penTextField')
        this.quickSearchButton = Selector('#quickSearchBtn')
        this.fullSearchButton = Selector('span').withText('Advanced Student Search')

        //Batch related
        this.viewK12Button = Selector('#K-12Btn')
        this.viewPsiButton = Selector('#PSIBtn')
        this.viewErrorsButton = Selector('#ErrorsBtn')
        this.advancedArchiveSearch = Selector('span').withText('Advanced Archive Search')
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

    async clickAdvancedArchiveSearch() {
        await t.click(this.advancedArchiveSearch)
        log.info("Advanced archive search button clicked")
    }

    async clickViewK12Button() {
        await t.click(this.viewK12Button)
        log.info("View K-12 button clicked")
    }

    async clickViewPsiButton() {
        await t.click(this.viewPsiButton)
        log.info("View PSI button clicked")
    }

    async clickViewErrorsButton() {
        await t.click(this.viewErrorsButton)
        log.info("View Errors button clicked")
    }
}

export default staffDashboardPage