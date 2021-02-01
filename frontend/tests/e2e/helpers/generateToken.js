'use strict';

const axios = require('axios');
const tokenData = require('../config/constants');

const utils = {
    async getToken() {
        const params = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        if (tokenData.token_environment == "tools") {
            const data = 'grant_type=client_credentials&client_id=' + tokenData.token_client_id + '&client_secret=' + tokenData.token_client_secret_tools;
            const response = await axios.post(tokenData.getTokenUrl, data, params);
            return response.data;

        }

        if (tokenData.token_environment == "dev") {
            const data = 'grant_type=client_credentials&client_id=' + tokenData.token_client_id + '&client_secret=' + tokenData.token_client_secret_dev;
            const response = await axios.post(tokenData.getTokenUrl, data, params);
            return response.data;

        }

        if (tokenData.token_environment == "test") {
            const data = 'grant_type=client_credentials&client_id=' + tokenData.token_client_id_test + '&client_secret=' + tokenData.token_client_secret_test;
            const response = await axios.post(tokenData.getTokenUrl, data, params);
            return response.data;

        }

        if (tokenData.token_environment == "") {
            const data = 'grant_type=client_credentials&client_id=' + tokenData.token_client_id_pre_prod + '&client_secret=' + tokenData.token_client_secret_pre_prod;
            const response = await axios.post(tokenData.getTokenUrl, data, params);
            return response.data;

        }
    }
}
module.exports = utils;