const helper = require("../../helpers/axios-helper")
const log = require('npmlog');
const constants = require('../../config/constants')
const { getToken } = require('../../helpers/generateToken')
var assert = require('assert');
const schoolData = require('../../config/myEdData/penCoordinators.json')



getToken().then(async (data) => {

    const token = data.access_token
    const endpoint = 'api/v1/pen-myed/pen-coordinators'
    const getCoordinators = await helper.getData(token, `${constants.myEdUrl}${endpoint}`)

    assert.deepStrictEqual(getCoordinators[0].districtNumber, schoolData.dataSet[0].districtNumber)
    assert.deepStrictEqual(getCoordinators[0].schoolNumber, schoolData.dataSet[0].schoolNumber)
    assert.deepStrictEqual(getCoordinators[0].mincode, schoolData.dataSet[0].mincode)

    assert.deepStrictEqual(getCoordinators[1200].districtNumber, schoolData.dataSet[1].districtNumber)
    assert.deepStrictEqual(getCoordinators[1200].schoolNumber, schoolData.dataSet[1].schoolNumber)
    assert.deepStrictEqual(getCoordinators[1200].mincode, schoolData.dataSet[1].mincode)

    assert.deepStrictEqual(getCoordinators[1700].districtNumber, schoolData.dataSet[2].districtNumber)
    assert.deepStrictEqual(getCoordinators[1700].schoolNumber, schoolData.dataSet[2].schoolNumber)
    assert.deepStrictEqual(getCoordinators[1700].mincode, schoolData.dataSet[2].mincode)

    assert.deepStrictEqual(getCoordinators[3215].districtNumber, schoolData.dataSet[3].districtNumber)
    assert.deepStrictEqual(getCoordinators[3215].schoolNumber, schoolData.dataSet[3].schoolNumber)
    assert.deepStrictEqual(getCoordinators[3215].mincode, schoolData.dataSet[3].mincode)

    log.info("Pen coordinators information verified")


})

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

