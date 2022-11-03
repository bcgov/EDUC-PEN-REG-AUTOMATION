const helper = require("../../../helpers/axios-helper");
const constants = require('../../../config/constants');
const { getToken } = require('../../../helpers/generateToken');
const rolesData = require('../../../config/roles/rolesData.json');


getToken().then(async (data) => {

    const token = data.access_token;

    const kcResponse = await helper.getData(token, `${constants.kcUrl}?username=${constants.idirReadOnlyCredentials.guid}`);
    console.log('IDIR user found');

    const userId = kcResponse[0].id;

    const rolesAvailable = await helper.getData(token, `${constants.kcUrl}/${userId}/role-mappings/realm/available`);
    const rolesRequired = [];

    for (let i = 0; i < rolesAvailable.length; i++) {
        if (rolesData.readOnlyRoles.some(role => role === rolesAvailable[i].name)) {
            //roles added to array
            rolesRequired.push(rolesAvailable[i]);
        }
    }

    const updateIdirRoles = await helper.postKCUser(token, `${constants.kcUrl}/${userId}/role-mappings/realm`, rolesRequired);
    console.log(updateIdirRoles);
}
)
    .catch((error => {
        console.log(error);
        throw new Error("Adding IDIR RolesToReadOnlyInKC failed");
    }))

