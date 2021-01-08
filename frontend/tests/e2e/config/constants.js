const config =require( '../config/index');
const faker = require('faker');

//Pen namespcae and environment related config
module.exports.pen_namespace = config.get('url:pen_namespace');
module.exports.pen_environment = config.get('url:pen_environment');

//Token related config
module.exports.token_namespace = config.get('token:token_namespace');
module.exports.token_environment = config.get('token:token_environment');
module.exports.token_client_id = config.get('token:token_client_id');
module.exports.token_client_secret_tools = config.get('token:token_client_secret_tools');
module.exports.token_client_secret_dev = config.get('token:token_client_secret_dev');
module.exports.bceid_digital_id_tools = config.get('token:bceid_digital_id_tools');
module.exports.bceid_digital_id_dev = config.get('token:bceid_digital_id_dev');
//Delete Digital ID
module.exports.delete_digital_id = config.get('token:delete_digital_id');
module.exports.pen_request_user_type = config.get('token:pen_request_user_type')

//URLs
module.exports.studentProfileUrl = 'https://'+ module.exports.pen_environment +'.getmypen.gov.bc.ca/api/auth/login_bceid'
module.exports.studentProfileUrlBcsc = 'https://'+ module.exports.pen_environment +'.getmypen.gov.bc.ca/api/auth/logout?loginBcsc=true'
module.exports.staffLoginUrl = 'https://student-admin-' + module.exports.pen_namespace + '-' + module.exports.pen_environment + '.apps.silver.devops.gov.bc.ca/';
module.exports.mailsacUrl = 'https://mailsac.com/login';
module.exports.getTokenUrl = 'https://soam-'+ module.exports.token_environment +'.apps.silver.devops.gov.bc.ca/auth/realms/master/protocol/openid-connect/token';
module.exports.pagenatedUrl = 'https://pen-request-api-' + module.exports.token_namespace + '-' + module.exports.token_environment + '.apps.silver.devops.gov.bc.ca/paginated';
module.exports.penRequestApiUrl = 'https://pen-request-api-' + module.exports.token_namespace + '-' + module.exports.token_environment + '.apps.silver.devops.gov.bc.ca/';
module.exports.studentApiUrl = 'https://student-api-' + module.exports.token_namespace + '-' + module.exports.token_environment + '.apps.silver.devops.gov.bc.ca/'
module.exports.digitalIdApiUrl = 'https://digitalid-api-' + module.exports.token_namespace + '-' + module.exports.token_environment + '.apps.silver.devops.gov.bc.ca/'
module.exports.studentProfileApiUrl = 'https://student-profile-api-' + module.exports.token_namespace + '-' + module.exports.token_environment + '.apps.silver.devops.gov.bc.ca/'
module.exports.penMatchApiUrl = 'https://pen-match-api-' + module.exports.pen_namespace + '-' + module.exports.token_environment + '.apps.silver.devops.gov.bc.ca/api/v1/pen-match'


//Bceid Credentials
module.exports.bceidCredentials = Object.freeze({
  username: config.get('bceid:user'),
  password: config.get('bceid:pass')
});

//BCSC Credentials
module.exports.bcscCredentials = Object.freeze({
  cardNumber: config.get('bcsc:cardNumber'),
  passcode: config.get('bcsc:passcode')
});


//IDIR Credentials
module.exports.idirAdminCredentials = Object.freeze({
  username: config.get('idirAdmin:user'),
  password: config.get('idirAdmin:pass')
});

//IDIR readonly credentials
module.exports.idirReadOnlyCredentials = Object.freeze({
  username: config.get('idirReadOnly:user'),
  password: config.get('idirReadOnly:pass')
});

//Mailsac email credentials
module.exports.mailsacCredentials = Object.freeze({
  username: config.get('penemail:user'),
  password: config.get('penemail:pass')
})

// PEN number
module.exports.penNumber =  config.get('penNumber')
module.exports.penMerged =  config.get('penMerged')
