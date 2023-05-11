const log = require('npmlog');
const { setupInstituteEntities } = require('../../../helpers/instituteUtils');

setupInstituteEntities().then(async () => {
  log.info('Entities refreshed.');
}).catch((error => {
  console.log(error)
  throw new Error("Entities refreshed failed")
}));