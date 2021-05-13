const helper = require("../../helpers/axios-helper")
const log = require('npmlog');
const constants = require('../../config/constants')
const { getToken } = require('../../helpers/generateToken')
var assert = require('assert');
var _ = require('lodash');
const studentDetails = require('../../config/myEdData/penRequest.json')

getToken().then(async (data) => {

    const token = data.access_token
    const endpoint = 'api/v1/pen-myed/pen-request'

    const getStudent = await helper.postStudentData(token, `${constants.myEdUrl}${endpoint}`, studentDetails.dataSet[0])

    studentDetails.dataSet[1].pen = constants.penNumber
    var remoteJSON = getStudent
    var localJSON = studentDetails.dataSet[1]

    if (_.isEqual(remoteJSON, localJSON)) {
        log.info("json payloads matched")
    }
    else {
        assert.fail("Json payloads did not match")
    }
})
    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

