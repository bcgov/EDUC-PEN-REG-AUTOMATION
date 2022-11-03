import { Selector, t } from 'testcafe'
const log = require('npmlog')

class penRequestFilesPage {

    constructor() {
        this.fixCheckbox = Selector('table:nth-of-type(1) > thead:nth-of-type(1) > tr:nth-of-type(1) > th:nth-of-type(9) > span:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > input:nth-of-type(1)')
        this.viewDetailsButton = Selector('#viewDetails')
        this.nextButton = Selector('button[aria-label="Next page"]')

    }

    async clickFixCheckbox() {
        await t.click(this.fixCheckbox)
        await t.wait(2000)
        log.info("Fix ceck box clicked")
    }

    async clickOnSubmissionNumber(data) {
        for (let i = 0; i <= 175; i++) {
            try {
                const element = Selector('a').withExactText(data)
                await t.click(element)
                log.info("clicked on submission number")
                break
            }
            catch (err) {
                await t.click(this.nextButton)
                log.info("Navigating to next page")
            }
        }
    }

    async resizeWindow(){
        await t.resizeWindow(1920, 1080)
        log.info("Resized the browser window")
    }

    async clickViewDetailsButton(){
            await t.click(this.viewDetailsButton)
            log.info("View details button clicked")
        }

    }

export default penRequestFilesPage