const helper = require("../../../../helpers/axios-helper");
const constants = require('../../../../config/constants');
const { getToken } = require('../../../../helpers/generateToken');
const log = require('npmlog');

getToken().then(async (data) => {
  const token = data.access_token

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

  try {
    const schoolResult = await helper.getData(token, `${constants.InstituteApiUrl}school/paginated`, schoolSearchParam);
    console.log('school result found');
    const school = schoolResult.content[0];
    // get school's primary activation code
    const edxSchoolPrimaryActivationCode = await helper.getData(token, `${constants.EDXApiUrl}users/activation-code/primary/SCHOOL/${school.schoolId}`);
    log.info('School primary code obtained');

    await helper.deleteData(token, `${constants.EDXApiUrl}users/activation-code/${edxSchoolPrimaryActivationCode.edxActivationCodeId}`);
    log.info('School primary code deleted');

  }
  catch(error) {
    console.log(error);
  }
})
.catch((error => {
  console.log(error);
  throw new Error("delete school primary activation code failed");
}));
