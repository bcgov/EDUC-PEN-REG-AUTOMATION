const { teardownSchoolPrincipal } = require('../../../helpers/schoolUtils');
const log = require("npmlog");

teardownSchoolPrincipal().then(async (data) => {

})

    .catch((error => {
        console.log(error)
        throw new Error("Delete School Principal failed")
    }));