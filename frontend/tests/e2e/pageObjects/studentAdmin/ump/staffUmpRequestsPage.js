import { Selector, t } from 'testcafe'
const log = require('npmlog')


class staffUmpRequestsPage {



    constructor() {

        this.mainSearchBar = Selector('.v-select__slot').filterVisible()
        this.penSearchBar = Selector('#pen-text-field').filterVisible()
        this.lastNameSearchBar = Selector('#last-name-text-field').filterVisible()
        this.firstNameSearchBar = Selector('#first-name-text-field')
        //this.searchResultFirstElement = Selector('td').withText(data)
    }



    async setMainStatusBar(data) {

        await t
            .click(this.mainSearchBar)
            .pressKey('backspace').pressKey('backspace').pressKey('backspace');
        await t.typeText(this.mainSearchBar, data, { replace: true })
        log.info(data + "  Entered in main status bar")
        await t.click(Selector('span').withText(data))
    }

    async setLastNameSearchBar(data) {
        await t.typeText(this.lastNameSearchBar, data)
        log.info("lastname entered")
    }

    async clickStatusResultFirstElement(data, pennum) {
        try {
            await t.wait(4000)
            this.searchResultFirstElement = Selector('td').withText(pennum)
            await t.click(this.searchResultFirstElement)
            log.info("Clicked on the search result one")

        } catch (err) {
            await t.eval(() => location.reload())
            log.info("page reloaded")

            await t
                .click(this.mainSearchBar)
                .pressKey('backspace').pressKey('backspace').pressKey('backspace');
            await t.typeText(this.mainSearchBar, data, { replace: true })
            log.info(data + "  Entered in main status bar")
            await t.click(Selector('span').withText(data))
            
            this.setPenNumberSearchBar(pennum)
            this.searchResultFirstElement = Selector('td').withText(data)
            await t.click(this.searchResultFirstElement)
        }
    }

    async setPenNumberSearchBar(data) {
        await t.typeText(this.penSearchBar, data)
        log.info("Pen number search bar is set")
    }


}
export default staffUmpRequestsPage