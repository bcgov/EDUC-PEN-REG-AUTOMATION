//*deprecated* we are avoiding changing roles data on main IDIR user
//Keeping this in place in case we need a quick way to add on admin roles for business client

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
        if (rolesData.adminRoles.some(role => role === rolesAvailable[i].name)) {
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
