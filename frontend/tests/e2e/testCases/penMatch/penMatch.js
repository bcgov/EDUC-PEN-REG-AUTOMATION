const helper = require("../../helpers/axios-helper");
const constants = require('../../config/constants')
const payload = require("../../config/penMatch.json")
const { getToken } = require('../../helpers/generateToken')
const assert = require('assert')
const log = require('npmlog')


getToken().then(async (data) => {

    const token = data.access_token;

    // Verify D1 payload
    const penMatchResponseD1 = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.D1)
    assert.deepStrictEqual(penMatchResponseD1.penStatus, "D1")
    log.info("D1 payload verified")

    //Verify D0 payload
    const penMatchResponseD0 = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.D0)
    assert.deepStrictEqual(penMatchResponseD0.penStatus, "D0")
    log.info("D0 payload verified")

    //Verify DM payload
    const penMatchResponseDM = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.DM)
    assert.deepStrictEqual(penMatchResponseDM.penStatus, "DM")
    log.info("DM payload verified")

    //Verify F1 payload
    const penMatchResponseF1 = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.F1)
    assert.deepStrictEqual(penMatchResponseF1.penStatus, "F1")
    log.info("F1 payload verified")

    //Verify G0 payload
    const penMatchResponseG0 = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.G0)
    assert.deepStrictEqual(penMatchResponseG0.penStatus, "G0")
    log.info("G0 payload verified")

    //************************************************************************************************************* */

    // Verify AA payload 
    const penMatchResponseAA = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.AA)
    assert.deepStrictEqual(penMatchResponseAA.penStatus, "AA")
    log.info("AA payload verified")

    //Verify B0 payload
    const penMatchResponseB0 = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.B0)
    assert.deepStrictEqual(penMatchResponseB0.penStatus, "B0")
    log.info("B0 payload verified")

    //Verify B1 payload
    const penMatchResponseB1 = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.B1)
    assert.deepStrictEqual(penMatchResponseB1.penStatus, "B1")
    log.info("B1 payload verified")

    //Verify BM payload
    const penMatchResponseBM = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.BM)
    assert.deepStrictEqual(penMatchResponseBM.penStatus, "BM")
    log.info("BM payload verified")

    //Verify C0 payload
    const penMatchResponseC0 = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.C0)
    assert.deepStrictEqual(penMatchResponseC0.penStatus, "C0")
    log.info("C0 payload verified")

    //Verify C1 payload
    const penMatchResponseC1 = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.C1)
    assert.deepStrictEqual(penMatchResponseC1.penStatus, "C1")
    log.info("C1 payload verified")

    //Verify CM payload
    const penMatchResponseCM = await helper.postPenMatchData(token, `${constants.penMatchApiUrl}`, payload.CM)
    assert.deepStrictEqual(penMatchResponseCM.penStatus, "CM")
    log.info("CM payload verified")


})

    .catch((error => {
        console.log(error);
        throw new Error("Test failed");
    }))

