const helper = require("../../../helpers/axios-helper");
const constants = require('../../../config/constants')
const studentData = require("../../../config/studentData/insertStudentData.json")
const digitalIDData = require("../../../config/digitalIDData/digitalIDData")
const { getToken } = require('../../../helpers/generateToken')
let nodeDate = require('date-and-time')


getToken().then(async (data) => {

    const token = data.access_token;

    //set date
    var d = new Date();
    d.setHours(d.getHours()-8);
    let yesterday = nodeDate.format(d, 'YYYY-MM-DDTHH:mm:ss')
    console.log(yesterday)

    // create temp digitalID to create the request
    const newDigitalID = await helper.postData(token, `${constants.digitalIdApiUrl}`, digitalIDData);
    console.log('digitalID created');
    console.log(digitalIDData);
    console.log(newDigitalID);
    studentData.digitalID = newDigitalID.digitalID;

    // insert Student record on Student Side
    const insertStudentRecord = await helper.postData(token, `${constants.penRequestApiUrl}`, studentData)
    console.log("Student Information    " + insertStudentRecord.legalLastName, insertStudentRecord.legalFirstName);


    //add more data to Student data to update the student record
    studentData.penRequestID = insertStudentRecord.penRequestID
    studentData.penRequestStatusCode = "ABANDONED"
    studentData.statusUpdateDate = yesterday

    //Update the Student record on Student Side
    const updateStudentRecord = await helper.putData(token, `${constants.penRequestApiUrl}`, studentData)
    console.log("Student Information    " + updateStudentRecord.legalLastName, updateStudentRecord.legalFirstName);

})

    .catch((error => {
        console.log(error);
        throw new Error("Test failed");
    }))

