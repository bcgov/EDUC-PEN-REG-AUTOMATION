const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const payload = require("../../../config/studentData/twinAndMergeStudentData.json")
const { getToken } = require('../../../helpers/generateToken')



getToken().then(async (data) => {
    const token = data.access_token

    for (let i = 0; i <= 5; i++) {

        switch (i) {

            case 0: payload.data[i].pen = constants.twinOnePen
                break
            case 1: payload.data[i].pen = constants.twinTwoPen
                break
            case 2: payload.data[i].pen = constants.twinThreePen
                break
            case 3: payload.data[i].pen = constants.mergeOnePen
                break
            case 4: payload.data[i].pen = constants.mergeTwoPen
                break
            case 5: payload.data[i].pen = constants.mergeThreePen
                break
        }

        const insertStudent = await helper.postStudentData(token, constants.studentApiUrl, payload.data[i])
        //console.log(insertStudent)
    }
})

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

