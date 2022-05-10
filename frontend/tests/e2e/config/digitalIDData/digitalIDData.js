let nodeDate = require('date-and-time');

let d = new Date();
let currentDate = nodeDate.format(d, 'YYYY-MM-DDTHH:mm:ss')

module.exports = {
  identityTypeCode: "BASIC",
  identityValue: "e2etesting",
  lastAccessDate: currentDate,
  lastAccessChannelCode: "OSPR"
};