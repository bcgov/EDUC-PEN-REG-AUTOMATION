const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const {getToken} = require('../../../helpers/generateToken')

getToken().then(async (data) => {
  const token = data.access_token;
  const kcResponse = await helper.getData(token,`${constants.kcUrl}?username=${constants.bceidCredentials.guid}@bceidbasic`);
  const userId = kcResponse[0].id;

  const deleteUser = await helper.deleteData(token,`${constants.kcUrl}/${userId}`);
  console.log(deleteUser);
}).catch((error => {
  console.log(error);
  throw new Error("Test failed");
}));


