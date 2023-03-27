const {getToken} = require('./generateToken');
const {getSchoolIDBySchoolCodeAndDistrictID, getDistrictIdByDistrictNumber, getAuthorityIDByAuthorityNumber} = require('../services/institute-api-service');
const constants = require('../config/constants');
const restUtils = require('./axios-helper');
const {DateTimeFormatter, LocalDateTime} = require('@js-joda/core');
const log = require("npmlog");

const instituteUtils = {

    async setupInstituteEntities(){
      await instituteUtils.createAuthorityWithContactToTest();
      let district = await instituteUtils.createDistrictWithContactToTest();
      await instituteUtils.createSchoolWithContactToTest(district.districtId);
    },

    async createDistrictWithContactToTest(){
      const data = await getToken();
      const token = data.access_token;

      let districtID = await getDistrictIdByDistrictNumber('999');

      const districtPayload = {
        createUser: 'PENREG1',
        updateUser: null,
        createDate: null,
        updateDate: null,
        districtNumber: '999',
        faxNumber: '2505555555',
        phoneNumber: '2505555555',
        email: 'fakeuser@sd5.bc.ca',
        website: null,
        displayName: 'Automation Testing District',
        districtRegionCode: 'NOT_APPLIC',
        districtStatusCode: 'ACTIVE'
      };
      const url = `${constants.instituteApiUrl}district`;
      if(!districtID){
        return restUtils.postData(token, url, districtPayload);
      }
      districtPayload.districtId = districtID;
      let freshDistrict = await restUtils.putData(token, url + '/' + districtID, districtPayload);
      await instituteUtils.setupDistrictContact(freshDistrict);
      return freshDistrict;
    },

    async createAuthorityWithContactToTest(){
      const data = await getToken();
      const token = data.access_token;

      let authorityID = await getAuthorityIDByAuthorityNumber('997'); // we use 997 because 999 exists in legacy data

      const authorityPayload = {
        createUser: 'PENREG1',
        updateUser: null,
        createDate: null,
        updateDate: null,
        authorityNumber: '997',
        independentAuthorityId: null,
        faxNumber: '2505555555',
        phoneNumber: '2505555555',
        email: 'fakeuser@sd5.bc.ca',
        displayName: 'Automation Testing Authority',
        authorityTypeCode: 'INDEPENDNT',
        openedDate: '2022-01-01T00:00:00',
        closedDate: null
      };
      const url = `${constants.instituteApiUrl}authority`;
      if(!authorityID){
        return restUtils.postData(token, url, authorityPayload);
      }
      authorityPayload.independentAuthorityId = authorityID;

      let freshAuthority = await restUtils.putData(token, url + '/' + authorityID, authorityPayload);
      await instituteUtils.setupAuthorityContact(freshAuthority);
      return freshAuthority;
    },

    async createSchoolWithContactToTest(districtID){
        const data = await getToken();
        const token = data.access_token;

        let schoolID = await getSchoolIDBySchoolCodeAndDistrictID('99999', districtID);

        const schoolPayload = {
            createUser: 'PENREG1',
            updateUser: null,
            createDate: null,
            updateDate: null,
            schoolId: null,
            districtId: districtID,
            independentAuthorityId: null,
            schoolNumber: '99999',
            faxNumber: '2505555555',
            phoneNumber: '2505555555',
            email: 'fakeuser@sd5.bc.ca',
            website: null,
            displayName: 'Automation Testing School',
            schoolOrganizationCode: 'TWO_SEM',
            schoolCategoryCode: 'PUBLIC',
            schoolReportingRequirementCode: 'REGULAR',
            facilityTypeCode: 'STANDARD',
            openedDate: '2022-01-01T00:00:00',
            closedDate: null
        };
        const url = `${constants.instituteApiUrl}school`;
        if(!schoolID){
          return restUtils.postData(token, url, schoolPayload);
        }
        schoolPayload.schoolId = schoolID;
        let freshSchool = await restUtils.putData(token, url + '/' + schoolID, schoolPayload);
        await instituteUtils.setupSchoolContact(freshSchool);
    },

    async setupSchoolContact(school){
      const data = await getToken();
      const token = data.access_token;

      const schoolContactPayload =
      {
        createUser: 'PENREG1',
        updateUser: null,
        createDate: null,
        updateDate: null,
        schoolContactId: null,
        schoolId: school.schoolId,
        schoolContactTypeCode: 'PRINCIPAL',
        phoneNumber: '2506656585',
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

      let newSchool = await restUtils.getData(token, `${constants.instituteApiUrl}school/${school.schoolId}`);
      const contactUrl = `${constants.instituteApiUrl}school/${school.schoolId}/contact`;

      if (newSchool.contacts) {
        log.info('deleting all school contacts');
        newSchool.contacts.forEach(contact => {
          restUtils.deleteData(token, `${contactUrl}/${contact.schoolContactId}`);
        });
      }

      log.info('adding Automation Testing school principal contact')
      return restUtils.postData(token, contactUrl, schoolContactPayload);
    },

    async setupDistrictContact(district){
      const data = await getToken();
      const token = data.access_token;

      const districtContactPayload =
        {
          createUser: 'PENREG1',
          updateUser: null,
          createDate: null,
          updateDate: null,
          districtContactId: null,
          districtId: district.districtId,
          districtContactTypeCode: 'SUPER',
          phoneNumber: '2506656585',
          jobTitle: 'Superintendent',
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

      let newDistrict = await restUtils.getData(token, `${constants.instituteApiUrl}district/${district.districtId}`);

      const contactUrl = `${constants.instituteApiUrl}district/${district.districtId}/contact`;

      if (newDistrict.contacts) {
        log.info('deleting all district contacts');
        newDistrict.contacts.forEach(contact => {
          restUtils.deleteData(token, `${contactUrl}/${contact.districtContactId}`);
        });
      }

      log.info('adding Automation Testing district superintendent contact')
      return restUtils.postData(token, contactUrl, districtContactPayload);
    },

    async setupAuthorityContact(authority){
      const data = await getToken();
      const token = data.access_token;

      const authorityContactPayload =
        {
          createUser: 'PENREG1',
          updateUser: null,
          createDate: null,
          updateDate: null,
          authorityContactId: null,
          authorityId: authority.independentAuthorityId,
          authorityContactTypeCode: 'INDAUTHREP',
          phoneNumber: '2506656585',
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

      let newAuthority = await restUtils.getData(token, `${constants.instituteApiUrl}authority/${authority.independentAuthorityId}`);

      const contactUrl = `${constants.instituteApiUrl}authority/${authority.independentAuthorityId}/contact`;

      if (newAuthority.contacts) {
        log.info('deleting all authority contacts');
        newAuthority.contacts.forEach(contact => {
          restUtils.deleteData(token, `${contactUrl}/${contact.authorityContactId}`);
        });
      }

      log.info('adding Automation Tester authority contact')
      return restUtils.postData(token, contactUrl, authorityContactPayload);

    },

};

module.exports = instituteUtils;