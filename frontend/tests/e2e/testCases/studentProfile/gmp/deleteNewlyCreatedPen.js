const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const studentData = require("../../../config/studentData/createNewPenData.json")
const { getToken } = require('../../../helpers/generateToken')


getToken().then(async (data) => {

    await new Promise(sleep => setTimeout(sleep, 60000));
    console.log("Implicit wait completed")
    
    const token = data.access_token

    let searchListCriteria = []

    searchListCriteria.push({ key: 'legalLastName', operation: 'eq', value: "HAMMOND", valueType: 'STRING' });
    searchListCriteria.push({ key: 'legalFirstName', operation: 'eq', value: "BRITNEY", valueType: 'STRING' });

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
)

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

