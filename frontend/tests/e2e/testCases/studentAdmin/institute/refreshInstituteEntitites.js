const log = require('npmlog');
const { setupInstituteEntities } = require('../../../helpers/instituteUtils');

setupInstituteEntities().then(async () => {
  log.info('Entites refreshed.');
}).catch((error => {
  console.log(error)
  throw new Error("Entites refreshed failed")
}));