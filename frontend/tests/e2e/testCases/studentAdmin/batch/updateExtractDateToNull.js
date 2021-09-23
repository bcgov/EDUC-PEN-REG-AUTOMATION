const helper = require("../../../helpers/axios-helper");
const constants = require('../../../config/constants')
const batchFiles = require("../../../config/batchData/batchFiles.json")
const { getToken } = require('../../../helpers/generateToken')


getToken().then(async (data) => {

    const token = data.access_token;

    for (let i = 0; i <= 1; i++) {

        const sourceId = batchFiles.batchData[i].penWebBlobId;

        //Update extract date to null
        const updateBatchRecord = await helper.putBatchData(token, `${constants.penRegBatchUrl}/source/${sourceId}`, batchFiles.batchData[i] )
        console.log("extractDateTime  "+ updateBatchRecord.extractDateTime);
    }
})

    .catch((error => {
        console.log(error);
        throw new Error("Test failed");
    }))

