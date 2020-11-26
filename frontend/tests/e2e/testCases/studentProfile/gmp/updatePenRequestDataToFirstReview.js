const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const studentData = require("../../../config/studentData/insertStudentData.json")
const bcscStudentData = require("../../../config/studentData/bcscStudentData.json")
const { getToken } = require('../../../helpers/generateToken')
const log = require('npmlog')
let nodeDate = require('date-and-time')


getToken().then(async (data) => {
    const token = data.access_token
    let searchListCriteria = []


    //set date
    var d = new Date();
    d.setHours(d.getHours() - 8);
    let yesterday = nodeDate.format(d, 'YYYY-MM-DDTHH:mm:ss')
    console.log(yesterday)

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

    // Get pen response
    const penResponse = await helper.getData(token, constants.pagenatedUrl, filterParam)
    // console.log(penResponse)

    if (penResponse.content && penResponse.content.length > 0) {

        // Get pen request ID
        const penreqId = penResponse.content[0].penRequestID
        // console.log("Pen request ID" + penreqId)


        // Get Pen Student record on student side
        const response = await helper.getData(token, `${constants.penRequestApiUrl}${penreqId}`)
        console.log("Student Information    " + response.legalLastName, response.legalFirstName, response.dob);

        //Get Digital ID
        const digitalID = response.digitalID

        //add more data to Student data to update the student record
        studentData.digitalID = digitalID
        studentData.penRequestID = penreqId
        studentData.emailVerified = "Y"
        studentData.initialSubmitDate = yesterday
        studentData.penRequestStatusCode = "INITREV"
        studentData.statusUpdateDate = yesterday


        const updateStudentRecord = await helper.putData(token, `${constants.penRequestApiUrl}`, studentData)
        console.log("Student Information    " + updateStudentRecord.legalLastName, updateStudentRecord.legalFirstName, updateStudentRecord.dob);

    }


})