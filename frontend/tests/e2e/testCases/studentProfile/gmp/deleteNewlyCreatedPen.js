const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const studentData = require("../../../config/studentData/createNewPenData.json")
const { getToken } = require('../../../helpers/generateToken')
const log = require('npmlog')

getToken().then(async (data) => {
    
    const token = data.access_token

    let searchListCriteria = []

    searchListCriteria.push({ key: 'legalLastName', operation: 'eq', value: studentData.legalSurname, valueType: 'STRING' });
    searchListCriteria.push({ key: 'legalFirstName', operation: 'eq', value: studentData.legalGivenname, valueType: 'STRING' });

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

    //Get Student ID
    for (let student of getStudentService.content) {
        const studentID = student.studentID

        //Delete Student record on student service
        await helper.deleteData(token, `${constants.studentApiUrl}${studentID}`)
        log.info('deleting newly created pen')
    }

}
)

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

