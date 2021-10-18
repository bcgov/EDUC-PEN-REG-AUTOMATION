import { Selector, t } from 'testcafe'
const log = require('npmlog')

class penRequestFilesPage {

    constructor() {
        this.fixCheckbox = Selector('table:nth-of-type(1) > thead:nth-of-type(1) > tr:nth-of-type(1) > th:nth-of-type(9) > span:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > input:nth-of-type(1)')
        this.viewDetailsButton = Selector('#viewDetails')

    }

    async clickFixCheckbox(){
        await t.click(this.fixCheckbox)
        await t.wait(2000)
        log.info("Fix ceck box clicked")
    }

    async clickOnSubmissionNumber(data){
        const element = Selector('a').withExactText(data)
        await t.click(element)
        log.info("clicked on submission number")
    }

    async maximizeWindow(){
        await t.maximizeWindow()
        log.info("Maximized the browser window")
    }

    async clickViewDetailsButton(){
        await t.click(this.viewDetailsButton)
        log.info("View details button clicked")
    }

}

export default penRequestFilesPage