const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const payload = require("../../../config/studentData/payload.json")
const { getToken } = require('../../../helpers/generateToken')



getToken().then(async (data) => {
    const token = data.access_token

    for (let i = 0; i <= 99; i++) {

        //insert student data 
        const insertStudent = await helper.postStudentData(token, constants.studentApiUrl, payload.data[i])
        console.log(insertStudent)
    }
})

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

