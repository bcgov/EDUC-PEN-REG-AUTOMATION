const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const payload = require("../../../config/studentData/insertStudentForHistoryData.json")
const { getToken } = require('../../../helpers/generateToken')



getToken().then(async (data) => {

    const token = data.access_token

    //insert student data 
    payload.data.pen = constants.penNumber
    const insertStudent = await helper.postStudentData(token, constants.studentApiUrl, payload.data)
    //console.log(insertStudent)

})

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

