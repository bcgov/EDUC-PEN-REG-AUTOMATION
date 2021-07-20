const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const studentData = require("../../../config/studentData/studentData.json")
const bcscStudentData = require("../../../config/studentData/bcscStudentData.json")
const { getToken } = require('../../../helpers/generateToken')
const log = require('npmlog')
let nodeDate = require('date-and-time')


getToken().then(async (data) => {
    const token = data.access_token
    let searchListCriteria = []

    if (constants.pen_request_user_type == "bceid") {
        searchListCriteria.push({ key: 'legalLastName', operation: 'eq', value: studentData.legalLastName, valueType: 'STRING' });
        searchListCriteria.push({ key: 'legalFirstName', operation: 'eq', value: studentData.legalFirstName, valueType: 'STRING' });
    }

    if (constants.pen_request_user_type == "bcsc") {
        searchListCriteria.push({ key: 'legalLastName', operation: 'eq', value: bcscStudentData.legalLastName, valueType: 'STRING' });
        searchListCriteria.push({ key: 'legalFirstName', operation: 'eq', value: bcscStudentData.legalFirstName, valueType: 'STRING' });
    }

    const filterParam = {
        params: {
            searchCriteriaList: JSON.stringify(searchListCriteria)
        }
    }

    //set date
    var d = new Date();
    d.setDate(d.getDate() - 366)
    let pastDate = nodeDate.format(d, 'YYYY-MM-DDTHH:mm:ss')

    // Get pen response
    const penResponse = await helper.getData(token, constants.pagenatedUrl, filterParam)


    if (penResponse.content && penResponse.content.length > 0) {

        if (penResponse.content[0].pen != null) {

            // Get pen request ID
            const penreqId = penResponse.content[0].penRequestID
            console.log("Pen request ID Zero " + penreqId)

            penResponse.content[0].initialSubmitDate = pastDate;
            //console.log(penResponse)

            const updatePenRequest = await helper.putData(token, `${constants.penRequestApiUrl}`, penResponse.content[0])
            //log.info("Updated pen request details below")
            //console.log(updatePenRequest)

        }
        else {
            // Get pen request ID
            const penreqId = penResponse.content[1].penRequestID
            console.log("Pen request ID One " + penreqId)

            penResponse.content[1].initialSubmitDate = pastDate;
            //console.log(penResponse)

            const updatePenRequest = await helper.putData(token, `${constants.penRequestApiUrl}`, penResponse.content[1])
            //log.info("Updated pen request details below")
            //console.log(updatePenRequest)

        }
    }

})

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

