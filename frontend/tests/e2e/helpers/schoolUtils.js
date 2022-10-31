const {getToken} = require('./generateToken');
const {getSchoolIDBySchoolCode} = require('../services/institute-api-service');
const constants = require('../config/constants');
const restUtils = require('./axios-helper');
const {DateTimeFormatter, LocalDateTime} = require('@js-joda/core');

const schoolUtils = {

    async setupSchoolWContact(){
        await schoolUtils.createSchoolToTest();
        let newSchool = await schoolUtils.getSchoolDetails('99999');

        await schoolUtils.createSchoolPrincipal(newSchool.schoolNumber);

        return await schoolUtils.getSchoolDetails(newSchool.schoolNumber);
    },

    async teardownSchoolWContact(school){
        let schoolContactId = school.contacts[0].schoolContactId;
        await schoolUtils.deleteSchoolPrincipal('99999', schoolContactId);
        await schoolUtils.deleteSchoolToTest('99999');
    },

    async setupSchoolPrincipal(){
        await schoolUtils.createSchoolPrincipal('99999');
        return await schoolUtils.getSchoolPrincipalDetails('99999');
    },

    async teardownSchoolPrincipal(){
        let principal = await schoolUtils.getSchoolPrincipalDetails('99999');
        await schoolUtils.deleteSchoolPrincipal('99999', principal.schoolContactId);
    },

    async createSchoolToTest(){
        const data = await getToken();
        const token = data.access_token;

        const schoolPayload = {
            createUser: 'PENREG1',
            updateUser: null,
            createDate: null,
            updateDate: null,
            schoolId: null,
            districtId: '34bb7566-ff59-653e-f778-2c1a4d669b00',
            mincode: null,
            independentAuthorityId: null,
            schoolNumber: '99999',
            faxNumber: '2504266673',
            phoneNumber: '2504265241',
            email: 'dave.hill@sd5.bc.ca',
            website: null,
            displayName: 'EDX Team School',
            schoolOrganizationCode: 'TWO_SEM',
            schoolCategoryCode: 'PUBLIC',
            facilityTypeCode: 'STANDARD',
            openedDate: '2022-01-01T00:00:00',
            closedDate: null,
            contacts: [
                {
                    createUser: null,
                    updateUser: null,
                    createDate: null,
                    updateDate: null,
                    schoolContactId: null,
                    schoolId: null,
                    schoolContactTypeCode: 'PRINCIPAL',
                    phoneNumber: '2506656585',
                    jobTitle: 'Principal',
                    phoneExtension: '123',
                    alternatePhoneNumber: '2506544578',
                    alternatePhoneExtension: '321',
                    publiclyAvailable: true,
                    email: 'test@test.com',
                    firstName: 'Dave',
                    lastName: 'Hill',
                    effectiveDate: '2022-10-25T00:00:00',
                    expiryDate: null
                }
            ]
        };
        const url = `${constants.instituteApiUrl}school`;
        return restUtils.postData(token, url, schoolPayload);
    },

    async deleteSchoolToTest(schoolNumber){
        const data = await getToken();
        const token = data.access_token;
        let schoolID = await getSchoolIDBySchoolCode(schoolNumber);
        const url = `${constants.instituteApiUrl}school/${schoolID}`;
        return restUtils.deleteData(token, url);
    },

    async getSchoolDetails(schoolNumber){

        const data = await getToken();
        const token = data.access_token;
        let schoolID = await getSchoolIDBySchoolCode(schoolNumber);
        const url = `${constants.instituteApiUrl}school/${schoolID}`;
        return restUtils.getData(token, url);
    },
    async createSchoolPrincipal(schoolNumber){
        const data = await getToken();
        const token = data.access_token;

        let schoolID = await getSchoolIDBySchoolCode(schoolNumber);
        const schoolPayload =
                {
                    createUser: 'PENREG1',
                    updateUser: null,
                    createDate: null,
                    updateDate: null,
                    schoolContactId: null,
                    schoolId: schoolID,
                    schoolContactTypeCode: 'PRINCIPAL',
                    phoneNumber: '2506656585',
                    jobTitle: 'Principal',
                    phoneExtension: '123',
                    alternatePhoneNumber: '2506544578',
                    alternatePhoneExtension: '321',
                    publiclyAvailable: true,
                    email: 'test@test.com',
                    firstName: 'Automation',
                    lastName: 'Testing',
                    effectiveDate: '2022-10-25T00:00:00',
                    expiryDate: null
                };

        const url = `${constants.instituteApiUrl}school/${schoolID}/contact`;
        return restUtils.postData(token, url, schoolPayload);
    },
    async deleteSchoolPrincipal(schoolNumber, contactId){
        const data = await getToken();
        const token = data.access_token;
        let schoolID = await getSchoolIDBySchoolCode(schoolNumber);
        const url = `${constants.instituteApiUrl}school/${schoolID}/contact/${contactId}`;
        return restUtils.deleteData(token, url);
    },
    async getSchoolPrincipalDetails(schoolNumber){
        let schoolPrincipal = '';
        let schoolDetails = await schoolUtils.getSchoolDetails(schoolNumber);

        const currentDate = LocalDateTime.now();
        for (const schoolContact of schoolDetails.contacts){
            if(schoolContact.schoolContactTypeCode === 'PRINCIPAL'){
                let parsedExpiryDate = null;
                if (schoolContact.expiryDate) {
                    parsedExpiryDate = new LocalDateTime.parse(schoolContact.expiryDate, DateTimeFormatter.ofPattern('uuuu-MM-dd\'T\'HH:mm:ss'));
                }
                if (parsedExpiryDate === null || parsedExpiryDate > currentDate) {
                    schoolPrincipal = schoolContact;
                }
            }
        }
        return schoolPrincipal;
    },
    async getFacilityTypeDisplayValue(typeCode) {
        const data = await getToken();
        const token = data.access_token;
        const url = `${constants.instituteApiUrl}facility-codes`;
        let facilityCodes =  await restUtils.getData(token, url);

        let result = facilityCodes.find( function (i){
            return (i.facilityTypeCode === typeCode)}).label;
        return result;
    },
    async getSchoolCategoryDisplayValue(categoryCode) {
        const data = await getToken();
        const token = data.access_token;
        const url = `${constants.instituteApiUrl}category-codes`;
        let categoryCodes =  await restUtils.getData(token, url);

        let result = categoryCodes.find( function (i){
            return (i.schoolCategoryCode === categoryCode)}).label;
        return result;
    },
    async getSchoolGradeListFormatted(grades) {
        const data = await getToken();
        const token = data.access_token;
        const url = `${constants.instituteApiUrl}grade-codes`;
        let gradeCodes =  await restUtils.getData(token, url);

        let gradeList = [];
        for(const grade of grades){
            gradeList.push(gradeCodes.find((gradeCode) => gradeCode.schoolGradeCode === grade.schoolGradeCode).label.replace('Grade ', ''));
        }

        let onlyNumbers = gradeList.filter(Number);
        let onlyLetters = gradeList.filter(x => !onlyNumbers.includes(x));

        onlyNumbers = onlyNumbers.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
        gradeList = onlyNumbers.concat(onlyLetters);
        return gradeList.toString().replace(/,/g, ', ');
    },
    async getSchoolOrganizationDisplayValue(organizationCode) {
        const data = await getToken();
        const token = data.access_token;
        const url = `${constants.instituteApiUrl}organization-codes`;
        let organizationCodes =  await restUtils.getData(token, url);

        let result = organizationCodes.find( function (i){
            return (i.schoolOrganizationCode === organizationCode)}).label;
        return result;
    },
    async getSchoolMailingAddress(addresses) {
        for(const address of addresses){
            if(address.addressTypeCode === 'MAILING'){
                return address;
            }
        }
    }
};

module.exports = schoolUtils;