const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const penNums = require("../../../config/studentData/nums.json")
const { getToken } = require('../../../helpers/generateToken')


getToken().then(async (data) => {

    const token = data.access_token

    for (let i = 0; i <= 99; i++) {

        let searchListCriteria2 = []

        searchListCriteria2.push({ key: 'pen', operation: 'eq', value: penNums.pen[i], valueType: 'STRING' });

        const search = [
            {
                searchCriteriaList: searchListCriteria2
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

