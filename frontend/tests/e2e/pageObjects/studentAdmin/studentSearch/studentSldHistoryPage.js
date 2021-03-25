import { Selector, t } from 'testcafe'
const log = require('npmlog')
import { ClientFunction } from 'testcafe';

class studentSldHistoryPage {

    constructor() {

    }


    async verifySldHistoryTableIsNotNull() {

        const table = Selector('#sldHistoryDataTable')
        const rowCount = await table.find('tr').count
        log.info("table row count    " + rowCount)

        for (let i = 1; i <= rowCount - 1; i++) {
            const date = Selector('tbody:nth-of-type(1) > tr:nth-of-type(' + i + ') > td:nth-of-type(1)')
            const lastname = Selector('tbody:nth-of-type(1) > tr:nth-of-type(' + i + ') > td:nth-of-type(3)')
            await t.expect(date.innerText).notEql('')
            await t.expect(lastname.innerText).notEql('')
        }
        log.info("table cells are not null")
    }



} export default studentSldHistoryPage