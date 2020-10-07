import { Selector, t } from 'testcafe'
const log = require('npmlog')
const moment = require('moment')


class staffPenRetrievalRequestPage {


    constructor() {

        this.mainSearchBar = Selector('.v-select__selections').filterVisible()
        this.lastNameSearchBar = Selector('#last-name-text-field').filterVisible()
        this.firstNameSearchBar = Selector('#first-name-text-field').filterVisible()
        this.reviewerSearchBar = Selector('#review-text-field').filterVisible()
        this.penSearchBar = Selector('#pen-text-field').filterVisible()
        this.statusResultFirstElement = Selector('div.v-application--wrap tr:nth-of-type(1) td:nth-of-type(2)').filterVisible()
        this.statusResultSecondElement = Selector('div.v-application--wrap tr:nth-of-type(2) td:nth-of-type(2)').filterVisible()
        this.submittedTime = Selector('div.v-data-table__wrapper table:nth-child(1) tbody:nth-child(3) tr:nth-child(1) > td:nth-child(2)')


        // Name Missplace Bug related selectors
        this.lastNameTextOfStudent1 = Selector('div.v-application--wrap tr:nth-of-type(1) td:nth-of-type(3)')
        this.lastNameTextOfStudent2 = Selector('div.v-application--wrap tr:nth-of-type(2) td:nth-of-type(3)')
    }


    async setMainStatusBar(data) {
        await t
            .click(this.mainSearchBar)
            .pressKey('backspace').pressKey('backspace').pressKey('backspace');
        await t.typeText(this.mainSearchBar, data, { replace: true })
        log.info(data + "  Entered in main status bar")
        await t.click(Selector('span').withText(data))
    }

    async clearMainStatusBar() {
        await t
            .click(this.mainSearchBar)
            .pressKey('backspace').pressKey('backspace').pressKey('backspace');
        log.info("data cleared")
    }

    async setStatusSearchBar(data) {
        await t.typeText(this.statusSearchBar, data)
        log.info(data + "  Entered in main search status bar")
    }

    async setLastNameSearchBar(data) {
        await t.typeText(this.lastNameSearchBar, data)
        log.info("Entered last name in search bar")
    }

    async setFirstNameSearchBar(data) {
        await t.typeText(this.firstNameSearchBar, data)
        log.info("Entered first name in search bar")
    }

    async setPenNumberSearchBar(data) {
        await t.typeText(this.penSearchBar, data)
        log.info("Pen number search bar is set")
    }

    async setReviewerSearchBar(data) {
        await t.typeText(this.reviewerSearchBar, data)
        log.info(data + "  Entered in reviewer search bar")
    }

    async clickStatusResultFirstElement() {
        await t.click(this.statusResultFirstElement)
        log.info("Clicked on the search result one")
    }

    async clickStatusResultSecondElement() {
        await t.click(this.statusResultSecondElement)
        log.info("Clicked on the search result two")
    }


    async grabLastnameStudent1() {
        const name = await (this.lastNameTextOfStudent1).innerText
        log.warn("last name grabbed from student 1    " + name)
        return name;
    }


    async grabLastnameStudent2() {
        const name = await (this.lastNameTextOfStudent2).innerText
        log.warn("last name grabbed from student 2    " + name)
        return name;
    }

    async verifyDateAndTimeFormat() {

        const time = await (this.submittedTime).innerText
        log.info("Submitted time    " + time)
        let re = new RegExp(/\d{4}-\d{2}-\d{2} \d{1,2}:\d{2} [AP]M/g)

        if (time && time.match(re)) {
            log.info("valid date format    " + time);
        }
        else{
            throw new Error("Not a valid Date and time format    "+  time);
        }
    }

}

export default staffPenRetrievalRequestPage