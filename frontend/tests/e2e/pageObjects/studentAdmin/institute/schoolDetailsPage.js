import { Selector, t } from 'testcafe'
const log = require('npmlog')
import {DateTimeFormatter, LocalDateTime} from '@js-joda/core';
const {getSchoolDetails,getFacilityTypeDisplayValue,getSchoolCategoryDisplayValue,getSchoolGradeListFormatted,getSchoolOrganizationDisplayValue,getSchoolMailingAddress} = require('../../../helpers/schoolUtils');

class SchoolDetailsPage {
  constructor() {

    this.schoolMCName = Selector('.subjectHeading');
    this.schoolOpenDate = Selector('span');
    this.schoolFacilityType = Selector('span');
    this.schoolCategory = Selector('span');
    this.schoolGradesOffered = Selector('span');
    this.schoolOrganization = Selector('span');
    this.schoolMailingAddress = Selector('span');
  }

  async verifySchoolDetails(schoolNumber) {

    let schoolDetails = await getSchoolDetails(schoolNumber);

    await this.verifySchoolMincodeName(schoolDetails.mincode, schoolDetails.displayName);
    await this.verifyOpenDate(schoolDetails.openedDate);
    await this.verifyFacilityType(schoolDetails.facilityTypeCode);
    await this.verifySchoolCategory(schoolDetails.schoolCategoryCode);
    await this.verifyGradesOffered(schoolDetails.grades);
    await this.verifyOrganization(schoolDetails.schoolOrganizationCode);
    await this.verifyMailingAddress(schoolDetails.addresses);

  }

  async verifySchoolMincodeName(mincode, displayName) {
    let mincode_name = mincode + ' - '+ displayName;
    await t.expect(this.schoolMCName.innerText).contains(mincode_name);
    log.info("School Mincode and Name Verified");
  }

  async verifyOpenDate(openDate) {
    let parsedOpenDate = new LocalDateTime.parse(openDate, DateTimeFormatter.ofPattern('uuuu-MM-dd\'T\'HH:mm:ss'));
    let openDateString = parsedOpenDate.format(DateTimeFormatter.ofPattern('uuuu/MM/dd'));
    await t.expect(this.schoolOpenDate.withText(openDateString).innerText).contains(openDateString);
    log.info("School Open Date Verified");
  }

  async verifyFacilityType(typeCode) {
    let facilityTypeDisplayValue = await getFacilityTypeDisplayValue(typeCode);
    await t.expect(this.schoolFacilityType.withText(facilityTypeDisplayValue).innerText).contains(facilityTypeDisplayValue);
    log.info("School Facility Type Verified");
  }

  async verifySchoolCategory(categoryCode) {
    let categoryCodeDisplayValue = await getSchoolCategoryDisplayValue(categoryCode);
    await t.expect(this.schoolCategory.withText(categoryCodeDisplayValue).innerText).contains(categoryCodeDisplayValue);
    log.info("School Category Verified");
  }

  async verifyGradesOffered(grades) {
    let formattedGradeList = await getSchoolGradeListFormatted(grades);
    await t.expect(this.schoolGradesOffered.withText(formattedGradeList).innerText).contains(formattedGradeList);
    log.info("School Grades Offered Verified");
  }

  async verifyOrganization(organizationCode) {
    let organizationDisplayValue = await getSchoolOrganizationDisplayValue(organizationCode);
    await t.expect(this.schoolOrganization.withText(organizationDisplayValue).innerText).contains(organizationDisplayValue);
    log.info("School Organization Verified");
  }

  async verifyMailingAddress(addresses) {
    let schoolMailingAddress = await getSchoolMailingAddress(addresses);
    let addressLine2 = schoolMailingAddress.city +', '+ schoolMailingAddress.provinceCode + ', ' + schoolMailingAddress.countryCode;

    await t.expect(this.schoolMailingAddress.withText(schoolMailingAddress.addressLine1).innerText).contains(schoolMailingAddress.addressLine1);
    await t.expect(this.schoolMailingAddress.withText(addressLine2).innerText).contains(addressLine2);
    await t.expect(this.schoolMailingAddress.withText(schoolMailingAddress.postal).innerText).contains(schoolMailingAddress.postal);
    log.info("School Mailing Address Verified");
  }

}

export default SchoolDetailsPage
