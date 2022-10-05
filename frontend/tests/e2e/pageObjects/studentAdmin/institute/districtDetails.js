import { Selector, t } from 'testcafe'
const log = require('npmlog')

class DistrictDetails {
    constructor() {
        this.districtNameDisplay = Selector('#districtName')
    }

    async verifyDistrictDetailsPage(districtName) {
        await t.expect(this.districtNameDisplay.withText(districtName).count).eql(1, {timeout: 3000});
        log.info("District Name Found on District Details Page");

    }
}

export default DistrictDetails;
