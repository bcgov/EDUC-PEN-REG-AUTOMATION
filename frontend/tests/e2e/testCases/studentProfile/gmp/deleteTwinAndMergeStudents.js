const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const { getToken } = require('../../../helpers/generateToken')
const log = require('npmlog')

getToken().then(async (data) => {

    await new Promise(sleep => setTimeout(sleep, 60000));
    console.log("Implicit wait completed")
    
    for (let i = 0; i <= 5; i++) {

        data = await getToken()

        const token = data.access_token

        let searchListCriteria = []

        switch (i) {

            case 0: searchListCriteria.push({ key: 'pen', operation: 'eq', value: constants.twinOnePen, valueType: 'STRING' });
                break
            case 1: searchListCriteria.push({ key: 'pen', operation: 'eq', value: constants.twinTwoPen, valueType: 'STRING' });
                break
            case 2: searchListCriteria.push({ key: 'pen', operation: 'eq', value: constants.twinThreePen, valueType: 'STRING' });
                break
            case 3: searchListCriteria.push({ key: 'pen', operation: 'eq', value: constants.mergeOnePen, valueType: 'STRING' });
                break
            case 4: searchListCriteria.push({ key: 'pen', operation: 'eq', value: constants.mergeTwoPen, valueType: 'STRING' });
                break
            case 5: searchListCriteria.push({ key: 'pen', operation: 'eq', value: constants.mergeThreePen, valueType: 'STRING' });
                break
        }

        const search = [
            {
                searchCriteriaList: searchListCriteria
            }
        ]
        const filterParam2 = {
            params: {
                searchCriteriaList: JSON.stringify(search)
            }
        }

        //Get Student record on student service
        const getStudentService = await helper.getData(token, `${constants.studentApiUrl}paginated`, filterParam2)
        //console.log(getStudentService)

        //Get Student ID
        const studentID = getStudentService.content[0].studentID
        //console.log("Student ID" + studentID)

        //Delete Student record on student service
        const deleteStudentService = await helper.deleteData(token, `${constants.studentApiUrl}${studentID}`)
        //console.log(deleteStudentService)

    }
})

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

