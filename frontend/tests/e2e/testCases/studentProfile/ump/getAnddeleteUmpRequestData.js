const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const { getToken } = require('../../../helpers/generateToken')
const log = require('npmlog')


getToken().then(async (data) => {
    const token = data.access_token
    let searchListCriteria = []

    //searchListCriteria.push({ key: 'recordedLegalLastName', operation: 'eq', value: "TAGAR", valueType: 'STRING' });
    //searchListCriteria.push({ key: 'recordedLegalFirstName', operation: 'eq', value: studentData.legalFirstName, valueType: 'STRING' });
    //searchListCriteria.push({ key: 'digitalID', operation: 'eq', value: "ac33a814-72e2-1070-8172-e7b0b453001f", valueType: 'UUID' });
    searchListCriteria.push({ key: 'recordedPen', operation: 'eq', value: constants.penNumber, valueType: 'STRING' });

    const filterParam = {
        params: {
            searchCriteriaList: JSON.stringify(searchListCriteria)
        }
    }

    // Get Ump response
    const umpResponse = await helper.getData(token, constants.studentProfileApiUrl + "paginated", filterParam)
    //console.log(umpResponse)


    if (umpResponse.content && umpResponse.content.length > 0) {

        const studentRequestID = umpResponse.content[0].studentRequestID
        log.info(studentRequestID)

        const digitalID = umpResponse.content[0].digitalID
        log.info(digitalID)

        //Delete Ump Record
        const deleteUmpReqRespone = await helper.deleteData(token, `${constants.studentProfileApiUrl}${studentRequestID}`)
        console.log(deleteUmpReqRespone)

        try {
            const digitalIDResponse = await helper.getData(token, `${constants.digitalIdApiUrl}${digitalID}`)
            //log.info(digitalIDResponse)

            if (digitalIDResponse) {

                //Delete DigitalId
                const deleteDigitalID = await helper.deleteData(token, `${constants.digitalIdApiUrl}${digitalID}`)
                console.log(deleteDigitalID)
                log.info("DigitalID is deleted")
            }
        }
        catch (error) {
            log.info("Digital ID is already deleted")
        }

    }

})

    .catch((error => {
        console.log(error);
        throw new Error("Test failed");
    }))


