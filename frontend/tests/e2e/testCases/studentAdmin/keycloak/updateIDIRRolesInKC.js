const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const { getToken } = require('../../../helpers/generateToken')
const rolesData = require('../../../config/roles/rolesData.json')

getToken().then(async (data) => {

    const token = data.access_token

    const kcResponse = await helper.getData(token, `${constants.kcUrl}?username=${constants.idirAdminCredentials.guid}`)
    console.log(kcResponse)

    const userId = kcResponse[0].id
    //console.log(userId)

    var rolesAvailable = await helper.getData(token, `${constants.kcUrl}/${userId}/role-mappings/realm/available`)
    //console.log(rolesAvailable)
    var rolesRequired = []

    for (let i = 0; i < rolesAvailable.length; i++) {

        if (rolesAvailable[i].name == rolesData.adminRoles[0] || rolesAvailable[i].name == rolesData.adminRoles[1] || rolesAvailable[i].name == rolesData.adminRoles[2]
            || rolesAvailable[i].name == rolesData.adminRoles[3] || rolesAvailable[i].name == rolesData.adminRoles[4] || rolesAvailable[i].name == rolesData.adminRoles[5]
            || rolesAvailable[i].name == rolesData.adminRoles[6] || rolesAvailable[i].name == rolesData.adminRoles[7] || rolesAvailable[i].name == rolesData.adminRoles[8]) {

            //roles added to array    
            console.log(rolesAvailable[i].name)
            rolesRequired.push(rolesAvailable[i])
        }
    }

    const updateIdirRoles = await helper.postKCUser(token, `${constants.kcUrl}/${userId}/role-mappings/realm`, rolesRequired)
    console.log(updateIdirRoles);
}
)
    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))
