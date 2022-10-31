const log = require('npmlog');
const { setupSchoolPrincipal } = require('../../../helpers/schoolUtils');

setupSchoolPrincipal().then(async (data) => {
    log.info('School Principal Created.');

})

    .catch((error => {
        console.log(error)
        throw new Error("Create School Principal failed")
    }));