const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const { getToken } = require('../../../helpers/generateToken')
const studentData = require('../../../config/studentData/insertStudentForSplit.json')


getToken().then(async (data) => {

    await new Promise(sleep => setTimeout(sleep, 60000));
    console.log("Implicit wait completed")
    
    const token = data.access_token


    for (let i = 1; i <= 2; i++) {

        let searchListCriteria = []

        if (i == 0) {
            searchListCriteria.push({ key: 'pen', operation: 'eq', value: constants.penSplit, valueType: 'STRING' });
        }

        if (i == 1) {
            searchListCriteria.push({ key: 'legalLastName', operation: 'eq', value: studentData.updates.legalLastName, valueType: 'STRING' });
            searchListCriteria.push({ key: 'legalFirstName', operation: 'eq', value: studentData.updates.legalFirstName, valueType: 'STRING' });
            searchListCriteria.push({ key: 'legalMiddleNames', operation: 'eq', value: studentData.updates.legalMiddleNames, valueType: 'STRING' });
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

