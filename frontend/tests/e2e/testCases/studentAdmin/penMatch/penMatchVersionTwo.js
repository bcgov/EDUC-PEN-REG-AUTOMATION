const helper = require("../../../helpers/axios-helper");
const constants = require('../../../config/constants')
const payload = require("../../../config/penMatchPayload/data.json")
const { getToken } = require('../../../helpers/generateToken')
const log = require('npmlog')


getToken().then(async (data) => {


    const token = data.access_token
    log.info("Payload array length  "+payload.data.length)

    for (let i = 0; i <= payload.data.length - 1; i++) {

        log.info("*****************************************************************************************************")

        console.log("Payload sent    "+ JSON.stringify(payload.data[i]))

        const penMatchResponse = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.data[i])

        log.info("Result")

        console.log(penMatchResponse)

    }

})

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

