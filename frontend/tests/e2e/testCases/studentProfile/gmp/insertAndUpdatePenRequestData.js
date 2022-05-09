const helper = require("../../../helpers/axios-helper");
const constants = require('../../../config/constants')
const studentData = require("../../../config/studentData/insertStudentData.json")
const { getToken } = require('../../../helpers/generateToken')
let nodeDate = require('date-and-time')


getToken().then(async (data) => {

    const token = data.access_token;

    //set date
    var d = new Date();
    d.setHours(d.getHours()-8);
    let yesterday = nodeDate.format(d, 'YYYY-MM-DDTHH:mm:ss')
    console.log(yesterday)

    const tempDigitalID = {
        identityTypeCode: "BASIC",
        identityValue: "e2etesting",
        lastAccessDate: "2022-05-09T01:01:01",
        lastAccessChannelCode: "OSPR"
    }

    // create temp digitalID to create the request
    const newDigitalID = await helper.postData(token, `${constants.digitalIdApiUrl}`, tempDigitalID);
    console.log('digitalID created it is...');
    console.log(newDigitalID);

    // Choose the Digital ID

    // if (constants.token_environment == "tools") {
    //     studentData.digitalID = constants.bceid_digital_id_tools
    // }
    //
    // if (constants.token_environment == "dev") {
    //     studentData.digitalID = constants.bceid_digital_id_dev
    // }
    //
    // if (constants.token_environment == "test") {
    //     studentData.digitalID = constants.bceid_digital_id_test
    // }
    //
    // if (constants.token_environment == "prod") {
    //     studentData.digitalID = constants.bceid_digital_id_pre_prod
    // }

    studentData.digitalID = newDigitalID.digitalID;

    // insert Student record on Student Side
    const insertStudentRecord = await helper.postData(token, `${constants.penRequestApiUrl}`, studentData)
    console.log("Student Information    " + insertStudentRecord.legalLastName, insertStudentRecord.legalFirstName, insertStudentRecord.dob);


    //add more data to Student data to update the student record
    studentData.penRequestID = insertStudentRecord.penRequestID
    studentData.emailVerified = "Y"
    studentData.initialSubmitDate = yesterday
    studentData.penRequestStatusCode = "INITREV"
    studentData.statusUpdateDate = yesterday

    //Update the Student record on Student Side
    const updateStudentRecord = await helper.putData(token, `${constants.penRequestApiUrl}`, studentData)
    console.log("Student Information    " + updateStudentRecord.legalLastName, updateStudentRecord.legalFirstName);

})

    .catch((error => {
        console.log(error);
        throw new Error("Test failed");
    }))

