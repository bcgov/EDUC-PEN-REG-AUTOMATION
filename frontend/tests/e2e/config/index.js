'use strict';
const nconf = require('nconf');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

//switch to local if running locally
const env = process.env.NODE_ENV;
//const env = 'local'

nconf.argv()
  .env()
  .file({ file: path.join(__dirname, `${env}.json`) });

nconf.defaults({
  url: {
    pen_namespace: process.env.PEN_NAMESPACE,
    pen_environment: process.env.PEN_ENVIRONMENT
  },
  token: {
    token_namespace: process.env.TOKEN_NAMESPACE,
    token_environment: process.env.TOKEN_ENVIRONMENT,

    token_client_id: process.env.TOKEN_CLIENT_ID,
    token_client_id_test: process.env.TOKEN_CLIENT_ID_TEST,

    token_client_secret_tools: process.env.TOKEN_CLIENT_SECRET_TOOLS,
    token_client_secret_dev: process.env.TOKEN_CLIENT_SECRET_DEV,
    token_client_secret_test: process.env.TOKEN_CLIENT_SECRET_TEST,

    bceid_digital_id_tools: process.env.BCEID_DIGITAL_ID_TOOLS,
    bceid_digital_id_dev: process.env.BCEID_DIGITAL_ID_DEV,
    bceid_digital_id_test: process.env.BCEID_DIGITAL_ID_TEST,

    delete_digital_id: process.env.DELETE_DIGITAL_ID,
    pen_request_user_type: process.env.PEN_REQUEST_USER_TYPE
  },
  bceid: {
    user: process.env.BCEID_USER,
    pass: process.env.BCEID_PASS
  },
  bcsc: {
    cardNumber: process.env.BCSC_CARD_NUMBER,
    passcode: process.env.BCSC_PASSCODE
  },
  idirAdmin: {
    user: process.env.IDIR_ADMIN_USER,
    pass: process.env.IDIR_ADMIN_PASS
  },
  idirReadOnly: {
    user: process.env.IDIR_READ_ONLY_USER,
    pass: process.env.IDIR_READ_ONLY_PASS
  },
  penemail: {
    user: process.env.PENEMAIL_USER,
    pass: process.env.PENEMAIL_PASS
  },
  penNumber: process.env.PEN_NUMBER,
  penMerged: process.env.PEN_MERGED,
  
  PenWeb: {
    user: process.env.PENWEB_USER,
    pass: process.env.PENWEB_PASS
  }
  
});

module.exports = nconf;
