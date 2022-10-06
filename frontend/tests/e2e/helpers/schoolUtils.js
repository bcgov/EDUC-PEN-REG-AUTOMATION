const {getToken} = require('./generateToken');
const {getSchoolIDBySchoolCode} = require('../services/institute-api-service');
const constants = require('../config/constants');
const restUtils = require('./axios-helper');
import {DateTimeFormatter, LocalDateTime} from '@js-joda/core';

const schoolUtils = {

    async getSchoolDetails(schoolNumber){

        const data = await getToken();
        const token = data.access_token;
        let schoolID = await getSchoolIDBySchoolCode(schoolNumber);
        const url = `${constants.instituteApiUrl}school/${schoolID}`;
        return await restUtils.getData(token, url);
    },
    async getSchoolPrincipalDetails(schoolNumber){
        let schoolPrincipal = '';
        let schoolDetails = await schoolSetUpUtils.getSchoolDetails(schoolNumber);
        const currentDate = LocalDateTime.now();
        for (const schoolContact of schoolDetails.contacts){
            if(schoolContact.schoolContactTypeCode === 'PRINCIPAL'){
                let parsedExpiryDate = null;
                if (schoolContact.expiryDate) {
                    parsedExpiryDate = new LocalDateTime.parse(schoolContact.expiryDate, DateTimeFormatter.ofPattern('uuuu-MM-dd\'T\'HH:mm:ss'));
                }
                if (parsedExpiryDate === null && parsedExpiryDate < currentDate) {
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