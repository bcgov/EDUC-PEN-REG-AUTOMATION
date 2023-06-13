const helper = require("../../../../helpers/axios-helper");
const constants = require('../../../../config/constants');
const { getToken } = require('../../../../helpers/generateToken');
const log = require('npmlog');

getToken().then(async (data) => {
  const token = data.access_token

  const edxUserInfo = {
    digitalIdentityID: "0a617b66-8332-17f5-8183-38da9c080007",
    firstName: "automation",
    lastName: "tester",
    email: "tester@test.com"
  };

  const schoolSearchCriteria = [{
    condition: null,
    searchCriteriaList: [
      {
        key: "displayName",
        operation: "eq",
        value: "Automation Testing School",
        valueType: "STRING",
        condition: null
      }
    ]
  }];

  const schoolSearchParam = {
    params: {
      searchCriteriaList: JSON.stringify(schoolSearchCriteria)
    }
  };

  const userSchoolResult = await helper.getData(token, `${constants.instituteApiUrl}school/paginated`, schoolSearchParam);
  const userSchool = userSchoolResult.content[0];
  log.info('school result found');

  // create EDX User
  const edxUser = await helper.postData(token, `${constants.EDXApiUrl}users`, edxUserInfo);
  log.info('edxUser created');

  const edxSchoolInfo = {
    edxUserID: edxUser.edxUserID,
    schoolID: userSchool.schoolId
  }

  //associate EDXUser to school
  const edxUserSchool = await helper.postData(token, `${constants.EDXApiUrl}users/${edxUser.edxUserID}/school`, edxSchoolInfo);
  log.info('school added to edxUser');

  //get roles to attach to edx user at school
  const edxRoles = await helper.getData(token, `${constants.EDXApiUrl}users/roles`);
  log.info("edx roles found");

  //find the secure exchange role to add to the user
  const secureExchangeRole = edxRoles.find(edxRole => edxRole.edxRoleCode === 'SECURE_EXCHANGE_SCHOOL');

  if (secureExchangeRole) {
    log.info("specific edx role found");

    const edxSchoolRoleInfo = {
      edxRole: secureExchangeRole,
      edxUserSchoolID: edxUserSchool.edxUserSchoolID,
      edxRoleCode: secureExchangeRole.edxRoleCode
    }

    //associate roles to EDX user at school
    await helper.postData(token, `${constants.EDXApiUrl}users/${edxUser.edxUserID}/school/${edxUserSchool.edxUserSchoolID}/role`, edxSchoolRoleInfo);
    log.info("roles added to edx user");
  } else {
    log.warn("role unable to be found. Will not add to edx user");
  }

})

.catch((error => {
  console.log(error);
  throw new Error("insert EDX User failed");
}));
