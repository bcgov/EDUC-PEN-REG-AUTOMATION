const helper = require("../../helpers/axios-helper")
const log = require('npmlog');
const constants = require('../../config/constants')
const { getToken } = require('../../helpers/generateToken')
var assert = require('assert');
var _ = require('lodash');
const studentDetails = require('../../config/aved/penRequest.json')

getToken().then(async (data) => {

    const token = data.access_token
    const endpoint = 'api/v1/aved/pen-request'

    const getStudent = await helper.postStudentData(token, `${constants.avedUrl}${endpoint}`, studentDetails.dataSet[0])

    console.log(getStudent)

})
    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

