'use strict';
const nconf = require('nconf');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

//switch to local if running locally
const env = process.env.NODE_ENV || 'local';

nconf.argv()
  .env()
  .file({ file: path.join(__dirname, `${env}.json`) });

nconf.defaults({
  url: {
    pen_namespace: process.env.PEN_NAMESPACE,
    pen_environment: process.env.PEN_ENVIRONMENT,
    edx_namespace: process.env.EDX_NAMESPACE,
    common_namespace: process.env.COMMON_NAMESPACE
  },
  token: {
    token_namespace: process.env.TOKEN_NAMESPACE,
    token_environment: process.env.TOKEN_ENVIRONMENT,

    token_client_id: process.env.TOKEN_CLIENT_ID,
    token_client_id_test: process.env.TOKEN_CLIENT_ID_TEST,
    token_client_id_pre_prod: process.env.TOKEN_CLIENT_ID_PRE_PROD,

    token_client_secret_tools: process.env.TOKEN_CLIENT_SECRET_TOOLS,
    token_client_secret_dev: process.env.TOKEN_CLIENT_SECRET_DEV,
    token_client_secret_test: process.env.TOKEN_CLIENT_SECRET_TEST,
    token_client_secret_pre_prod: process.env.TOKEN_CLIENT_SECRET_PRE_PROD,

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
  idirUnauthorized: {
    user: process.env.IDIR_UNAUTHORIZED_USER,
    pass: process.env.IDIR_UNAUTHORIZED_PASS
  },
  penemail: {
    user: process.env.PENEMAIL_USER,
    pass: process.env.PENEMAIL_PASS
  },
  penNumber: process.env.PEN_NUMBER,
  penMerged: process.env.PEN_MERGED,
  penStudentHistory: process.env.PEN_STUDENT_HISTORY,
  penSplit: process.env.PEN_SPLIT,

  twinOnePen: process.env.TWIN_ONE_PEN,
  twinTwoPen: process.env.TWIN_TWO_PEN,
  twinThreePen: process.env.TWIN_THREE_PEN,

  mergeOnePen: process.env.MERGE_ONE_PEN,
  mergeTwoPen: process.env.MERGE_TWO_PEN,
  mergeThreePen: process.env.MERGE_THREE_PEN,

  PenWeb: {
    url: process.env.PENWEB_URL,
    user: process.env.PENWEB_USER,
    pass: process.env.PENWEB_PASS
  },

  JB: {
    jbGmpPage: process.env.JB_GMP_PAGE_URL,
    jbUmpPage: process.env.JB_UMP_PAGE_URL,
    jbRegisterPage: process.env.REGISTER_PAGE_URL,
    gmpPage: process.env.GMP_PAGE_URL,
    umpPage: process.env.UMP_PAGE_URL
  },

  studentEntryPoint : process.env.STUDENT_ENTRY_POINT,

});

module.exports = nconf;
