const helper = require("../../../../../helpers/axios-helper");
const constants = require('../../../../../config/constants');
const { getToken } = require('../../../../../helpers/generateToken');
const log = require('npmlog');

getToken().then(async (data) => {
  const token = data.access_token

  const edxUserInfo = {
    digitalIdentityID: "9230046d-feac-4310-8708-f27db0ecc2a2",
    firstName: "automationdistrictuser",
    lastName: "tester",
    email: "tester@test.com"
  };

  const districtsResponse = await helper.getData(token, `${constants.instituteApiUrl}district`);
  const district = districtsResponse.find(selectDistrict => selectDistrict.displayName.toUpperCase() === 'ROCKY MOUNTAIN');
  log.info('districts result found');

  // create EDX User
  const edxUser = await helper.postData(token, `${constants.EDXApiUrl}users`, edxUserInfo);
  log.info('edxUser created');

  const edxUserDistrictInfo = {
    edxUserID: edxUser.edxUserID,
    districtID: district.districtId,
  }

  //associate EDXUser to school
  const edxUserDistrict = await helper.postData(token, `${constants.EDXApiUrl}users/${edxUser.edxUserID}/district`, edxUserDistrictInfo);
  log.info('district added to edxUser');

  //get roles to attach to edx user at school
  const edxDistrictRoles = await helper.getData(token, `${constants.EDXApiUrl}users/roles?instituteType=DISTRICT`);
  log.info("edx district roles found");

  if (edxDistrictRoles) {
    log.info("edx district role found");

    const edxDistrictRoleInfo = {
      edxUserDistrictID: edxUserDistrict.edxUserDistrictID,
      edxRoleCode: edxDistrictRoles[0]?.edxRoleCode
    }

    //associate roles to EDX user at school
    await helper.postData(token, `${constants.EDXApiUrl}users/${edxUser.edxUserID}/district/${edxUserDistrict.edxUserDistrictID}/role`, edxDistrictRoleInfo);
    log.info("roles added to edx  district user");
  } else {
    log.warn("role unable to be found. Will not add to edx district user");
  }

})

.catch((error => {
  console.log(error);
  throw new Error("insert EDX District User failed");
}));
