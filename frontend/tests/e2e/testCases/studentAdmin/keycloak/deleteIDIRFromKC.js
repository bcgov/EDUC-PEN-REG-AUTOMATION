const helper = require("../../../helpers/axios-helper");
const constants = require('../../../config/constants');
const { getToken } = require('../../../helpers/generateToken');

getToken().then(async (data) => {
        const token = data.access_token;

        const kcResponse = await helper.getData(token,`${constants.kcUrl}?username=${constants.idirReadOnlyCredentials.guid}`);
        const userId = kcResponse[0].id;
        console.log('IDIR user found');

        await helper.deleteData(token,`${constants.kcUrl}/${userId}`);
        console.log('IDIR user deleted');
    }
)
.catch((error => {
    console.log(error)
    throw new Error("deleteIDIRFromKC failed")
}));

