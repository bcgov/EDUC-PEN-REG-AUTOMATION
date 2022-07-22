const helper = require("../../../../helpers/axios-helper");
const constants = require('../../../../config/constants');
const { getToken } = require('../../../../helpers/generateToken');
const log = require('npmlog');

getToken().then(async (data) => {
  const token = data.access_token

  try {
    // get school's primary activation code
    const edxSchoolPrimaryActivationCode = await helper.getData(token, `${constants.EDXApiUrl}users/activation-code/primary/00899178`);
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
