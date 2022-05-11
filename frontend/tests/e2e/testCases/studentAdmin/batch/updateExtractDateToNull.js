const helper = require("../../../helpers/axios-helper");
const constants = require('../../../config/constants')
const batchFiles = require("../../../config/batchData/batchFiles.json")
const { getToken } = require('../../../helpers/generateToken')


getToken().then(async (data) => {

    const token = data.access_token;

    if (constants.pen_environment == "test") {

        for (let i = 0; i <= batchFiles.batchData.test.length - 1; i++) {

            const sourceId = batchFiles.batchData.test[i].penWebBlobId;

            //Update extract date to null
            const updateBatchRecord = await helper.putBatchData(token, `${constants.penRegBatchUrl}/source/${sourceId}`, batchFiles.batchData.test[i])
            console.log("extractDateTime  " + updateBatchRecord.extractDateTime);
        }
    }
})

    .catch((error => {
        console.log(error);
        throw new Error("Test failed");
    }))

