const helper = require("../../../helpers/axios-helper");
const constants = require('../../../config/constants')
const batchFiles = require("../../../config/batchData/batchFiles.json")
const { getToken } = require('../../../helpers/generateToken')


getToken().then(async (data) => {

    const token = data.access_token;

    for (let i = 5; i <= batchFiles.batchData.test.length - 1; i++) {

        const submissionNumber = batchFiles.batchData.test[i].submissionNumber

        //Get pen request batch ID
        const getBatchRecord = await helper.getData(token, `${constants.penRegBatchUrl}?submissionNumber=${submissionNumber}`)
        //console.log(getBatchRecord);

        const penRequestBatchID = getBatchRecord[0].penRequestBatchID;
        console.log("pen request batch ID" + penRequestBatchID)


        //Delete Batch record
        const deleteBatchRecord = await helper.deleteData(token, `${constants.penRegBatchUrl}/${penRequestBatchID}`)
        console.log(deleteBatchRecord);
    }
})

    .catch((error => {
        console.log(error);
        throw new Error("Test failed");
    }))

