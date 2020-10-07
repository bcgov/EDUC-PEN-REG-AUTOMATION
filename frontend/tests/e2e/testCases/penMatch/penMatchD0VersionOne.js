const helper = require("../../helpers/axios-helper");
const constants = require('../../config/constants')
const payload = require("../../config/penMatchPayload/D0.json")
const { getToken } = require('../../helpers/generateToken')
const assert = require('assert')
const log = require('npmlog')


getToken().then(async (data) => {


    const token = data.access_token
    log.info("Payload array length  "+payload.D0.length)

    for (let i = 0; i <= payload.D0.length - 1; i++) {

        const penMatchResponseD0 = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.D0[i])

        if (penMatchResponseD0.penStatus !== "D0") {
            console.log(payload.D0[i])
        }

        assert.deepStrictEqual(penMatchResponseD0.penStatus, "D0")
        log.info("Successfully verified the payload "+ i)

    }

})

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

