const helper = require("../../../helpers/axios-helper");
const constants = require('../../../config/constants')
const payload = require("../../../config/penMatchPayload/D0.json")
const { getToken } = require('../../../helpers/generateToken')
const log = require('npmlog')


getToken().then(async (data) => {
    let promises = [];

    const token = data.access_token

    log.info("Payload array length  " + payload.D0.length)

    for (let i = 0; i <= payload.D0.length - 1; i++) {

        promises.push(helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.D0[i]))

    }

    const resultsArray = await Promise.allSettled(promises)
    
    console.log(resultsArray)

    for (let i = 0; i <= payload.D0.length - 1; i++) {

        if (resultsArray[i].value.penStatus !== "D0") {

            log.info("test failed on the  payload  "+ i)

            log.info("pen status returned as  "+ resultsArray[i].value.penStatus)

            console.log(payload.D0[i])
        }

    }
})

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

