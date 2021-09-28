import { Selector, t } from 'testcafe'
const log = require('npmlog')

class archivedPenRequestFilesPage {

    constructor() {

        //filter options
        this.submissionNumber = Selector('#submissionNumber')
        this.mincode = Selector('#minCode')
        this.schoolName = Selector('#schoolName')
        this.dateFrom = Selector('#loadDateFrom')
        this.dateTo = Selector('#loadDateTo')

        //checkbox
        this.checkBox = Selector('tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > input:nth-of-type(1)')

        // clear and search buttons
        this.clearButton = Selector('#refine-action')
        this.searchButton = Selector('#search-action')

        //action buttons
        this.viewButton = Selector('#view-action')
        this.viewList = Selector('div#view-list-action')
        this.viewDetails = Selector('#view-details-action')
        this.unArchiveButton = Selector('span').withText('Unarchive')

    }

    async setSubmissionNumber(data) {
        await t.typeText(this.submissionNumber, data)
        log.info("Submission number set")
    }

    async setMincode(data) {
        await t.typeText(this.mincode, data)
        log.info("mincode set")
    }

    async setSchoolName(data) {
        await t.typeText(this.schoolName, data)
        log.info("school name set")
    }

    async setDateFrom(data) {
        await t.typeText(this.dateFrom, data)
        log.info("date from set")
    }

    async setDateTo(data) {
        await t.typeText(this.dateTo, data)
        log.info("date to set")
    }

    async clickClearButton() {
        await t.click(this.clearButton)
        log.info("clear button clicked")
    }

    async clickSearchButton() {
        await t.click(this.searchButton)
        log.info("search button clicked")
    }

    async clickCheckBox() {
        await t.click(this.checkBox , { timeout: 3000 })
        log.info("check box clicked")
    }

    async clickViewButton() {
        await t.click(this.viewButton)
        log.info("view button clicked")
    }

    async clickViewList() {
        await t.wait(2000)
        await t.click(this.viewList)
        log.info("view list button clicked")
    }

    async clickViewDetails() {
        await t.click(this.viewDetails)
        log.info("view details button clicked")
    }

    async clickUnarchiveButton() {
        await t.click(this.unArchiveButton)
        log.info("unarchive button clicked")
    }

    async selectRequests() {
        const checkboxes = await Selector('input').withAttribute('type', 'checkbox')
        const count = await checkboxes.count; //get items count 
        log.info("selector count    " + count)
        for (let i = 0; i < count; i++) {
            await t.click(checkboxes) //click each link 
        }
    }

    async clickViewDetailsButton() {
        const element = await Selector('#viewDetails')
        await t.click(element)
        log.info("view details button clicked")
    }
}
export default archivedPenRequestFilesPage