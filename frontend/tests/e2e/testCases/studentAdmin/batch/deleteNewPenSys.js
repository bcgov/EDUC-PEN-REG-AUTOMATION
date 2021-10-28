const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const studentDetails = require('../../../config/batchData/autmn006and007.json')
const { getToken } = require('../../../helpers/generateToken')


getToken().then(async (data) => {

    await new Promise(sleep => setTimeout(sleep, 60000));
    console.log("Implicit wait completed")

    for (let i = 5; i <= studentDetails.studentData.length - 1; i++) {

        const token = data.access_token

        let searchListCriteria = []

        // searchListCriteria.push({ key: 'legalLastName', operation: 'eq', value: studentDetails.studentData[i].legalLastName, valueType: 'STRING' });
        // searchListCriteria.push({ key: 'legalFirstName', operation: 'eq', value: studentDetails.studentData[i].legalFirstName, valueType: 'STRING' });
        // searchListCriteria.push({ key: 'legalMiddleNames', operation: 'eq', value: studentDetails.studentData[i].legalMiddleNames, valueType: 'STRING' });
        searchListCriteria.push({ key: 'localID', operation: 'eq', value: studentDetails.studentData[i].localID, valueType: 'STRING' });
        // searchListCriteria.push({ key: 'createUser', operation: 'eq', value: studentDetails.studentData[i].createUser, valueType: 'STRING' });
        // searchListCriteria.push({ key: 'updateUser', operation: 'eq', value: studentDetails.studentData[i].updateUser, valueType: 'STRING' });

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

        // Get Student ID
        const studentID = getStudentService.content[0].studentID
        //console.log("Student ID" + studentID)

        //Delete Student record on student service
        const deleteStudentService = await helper.deleteData(token, `${constants.studentApiUrl}${studentID}`)
        //console.log(deleteStudentService)

    }

}

)

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

