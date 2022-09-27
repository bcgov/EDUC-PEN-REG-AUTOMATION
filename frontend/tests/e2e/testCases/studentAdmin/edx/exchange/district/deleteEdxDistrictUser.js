const helper = require("../../../../../helpers/axios-helper");
const constants = require('../../../../../config/constants');
const { getToken } = require('../../../../../helpers/generateToken');
const log = require('npmlog');

getToken().then(async (data) => {
  const token = data.access_token

  // get EDX Users at school
  const edxUsers = await helper.getData(token, `${constants.EDXApiUrl}users`, {params: {firstName: "automationdistrictuser"}});
  log.info('edxUsers list obtained');

  const edxUserID = edxUsers.find(edxUser => edxUser.firstName === "automationdistrictuser" && edxUser.lastName === "tester")?.edxUserID;

  if (edxUserID) {
    log.info('obtained user ID for tester');
    await helper.deleteData(token, `${constants.EDXApiUrl}users/${edxUserID}`);
    log.info("user deleted");
  } else {
    log.warn("user not found - did not delete");
  }

})

.catch((error => {
  console.log(error)
  throw new Error("delete EDX user failed")
}));
