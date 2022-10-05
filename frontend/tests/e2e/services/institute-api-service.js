
const restUtils = require('../helpers/axios-helper');
const constants = require('../config/constants');

const log = require('npmlog');
const {getToken} = require('../helpers/generateToken');
const SCHOOL_ENDPOINT = `school`;
const DISTRICT_ENDPOINT = `district`;

const instituteApiService = {

    async getAllSchools(token) {
        const url = `${constants.instituteApiUrl}${SCHOOL_ENDPOINT}`;
        return restUtils.getData(token, url);
    },

    async getSchoolIDBySchoolCode(schoolCode) {
        const data = await getToken();
        const token = data.access_token;

        const schoolSearchCriteria = [{
            condition: null,
            searchCriteriaList: [
                {
                    key: "schoolNumber",
                    operation: "eq",
                    value: schoolCode,
                    valueType: "STRING",
                    condition: "AND"
                },
                {
                    key: "closedDate",
                    operation: "eq",
                    value: null,
                    valueType: "STRING",
                    condition: "AND"
                }
            ]
        }];

        const schoolSearchParam = {
            params: {
                searchCriteriaList: JSON.stringify(schoolSearchCriteria)
            }
        };
        const url = `${constants.instituteApiUrl}${SCHOOL_ENDPOINT}/paginated`;
        const userSchoolResult = await restUtils.getData(token, url, schoolSearchParam);
        return userSchoolResult?.content[0]?.schoolId;
    },

    async getDistrictIdByDistrictNumber(districtNumber) {
        const data = await getToken();
        const token = data.access_token;
        const url = `${constants.instituteApiUrl}${DISTRICT_ENDPOINT}`;
        const districtResponse = await restUtils.getData(token, url);
        for (const district of districtResponse) {
            if (district.districtNumber === districtNumber) {
                return district.districtId;
            }
        }
    },

    async getAllDistricts(token) {
        const url = `${constants.instituteApiUrl}${DISTRICT_ENDPOINT}`;
        return restUtils.getData(token, url);
    }
};


module.exports = instituteApiService;
