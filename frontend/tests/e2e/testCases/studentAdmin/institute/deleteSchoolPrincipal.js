const { teardownSchoolPrincipal } = require('../../../helpers/schoolUtils');
const log = require("npmlog");

teardownSchoolPrincipal().then(async (data) => {
    log.info('School Principal Deleted.');

})

    .catch((error => {
        console.log(error)
        throw new Error("Delete School Principal failed")
    }));