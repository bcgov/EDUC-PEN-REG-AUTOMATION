const helper = require("../../../../helpers/axios-helper");
const constants = require('../../../../config/constants');
const { getToken } = require('../../../../helpers/generateToken');
const log = require('npmlog');

getToken().then(async (data) => {
  const token = data.access_token

  const edxUserInfo = {
    digitalIdentityID: "964b3509-2b54-4374-9db2-21916f553c05",
    firstName: "automation",
    lastName: "tester",
    email: "tester@test.com"
  };

  //this will give us the school wildflower
  const schoolSearchCriteria = [{
    condition: null,
    searchCriteriaList: [
      {
        key: "schoolNumber",
        operation: "eq",
        value: "99178",
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

  const userSchoolResult = await helper.getData(token, `${constants.InstituteApiUrl}school/paginated`, schoolSearchParam);
  console.log('school result found');
  const userSchool = userSchoolResult.content[0];

  // create EDX User
  const edxUser = await helper.postData(token, `${constants.EDXApiUrl}users`, edxUserInfo);
  log.info('edxUser created');

  const edxSchoolInfo = {
    edxUserID: edxUser.edxUserID,
    mincode: userSchool.mincode,
    schoolID: userSchool.schoolId
  }

  //associate EDXUser to school
  const edxUserSchool = await helper.postData(token, `${constants.EDXApiUrl}users/${edxUser.edxUserID}/school`, edxSchoolInfo);
  log.info('school added to edxUser');

  //get roles to attach to edx user at school
  const edxRoles = await helper.getData(token, `${constants.EDXApiUrl}users/roles`);
  log.info("edx roles found");

  //find the secure exchange role to add to the user
  const secureExchangeRole = edxRoles.find(edxRole => edxRole.edxRoleCode === 'SECURE_EXCHANGE');

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
