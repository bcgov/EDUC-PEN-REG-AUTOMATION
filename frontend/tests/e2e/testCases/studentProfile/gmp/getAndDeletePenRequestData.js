const helper = require("../../../helpers/axios-helper")
const constants = require('../../../config/constants')
const studentData = require("../../../config/studentData/studentData.json")
const bcscStudentData = require("../../../config/studentData/bcscStudentData.json")
const { getToken } = require('../../../helpers/generateToken')
const log = require('npmlog')


getToken().then(async (data) => {
    const token = data.access_token
    let searchListCriteria = []
    let searchListCriteria2 = []

    if (constants.pen_request_user_type == "bceid") {
        searchListCriteria.push({ key: 'legalLastName', operation: 'eq', value: studentData.legalLastName, valueType: 'STRING' });
        searchListCriteria.push({ key: 'legalFirstName', operation: 'eq', value: studentData.legalFirstName, valueType: 'STRING' });
    }

    if (constants.pen_request_user_type == "bcsc") {
        searchListCriteria.push({ key: 'legalLastName', operation: 'eq', value: bcscStudentData.legalLastName, valueType: 'STRING' });
        searchListCriteria.push({ key: 'legalFirstName', operation: 'eq', value: bcscStudentData.legalFirstName, valueType: 'STRING' });
    }

    const filterParam = {
        params: {
            searchCriteriaList: JSON.stringify(searchListCriteria)
        }
    }

    // Get pen response
    const penResponse = await helper.getData(token, constants.pagenatedUrl, filterParam)
    // console.log(penResponse)

    if (penResponse.content && penResponse.content.length > 0) {

        // Get pen request ID
        const penreqId = penResponse.content[0].penRequestID
        // console.log("Pen request ID" + penreqId)


        // Get Pen Student record on student side
        const response = await helper.getData(token, `${constants.penRequestApiUrl}${penreqId}`)
        console.log("Student Information    " + response.legalLastName, response.legalFirstName, response.dob);

        //Get Digital ID
        const digitalID = response.digitalID
        // console.log("digital ID" + digitalID)


        // Delete Student recoed on Student Side
        const deletePenReqRespone = await helper.deleteData(token, `${constants.penRequestApiUrl}${penreqId}`)
        //console.log(deletePenReqRespone)


        // create list 2
        searchListCriteria2.push({ key: 'pen', operation: 'eq', value: constants.penNumber, valueType: 'STRING' });


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

        if (getStudentService.content && getStudentService.content.length > 0) {

            // //Get Student ID
            // const studentID = getStudentService.content[0].studentID
            // //console.log("Student ID" + studentID)

            // //Delete Student record on student service
            // const deleteStudentService = await helper.deleteData(token, `${constants.studentApiUrl}${studentID}`)
            // //console.log(deleteStudentService)

            //get student ID and Digita ID
            const getDigitalID = await helper.getData(token, `${constants.digitalIdApiUrl}${digitalID}`)
            //console.log(getDigitalID)

            // Create payload
            const payload = getDigitalID
            payload.studentID = null
            payload.createDate = null
            payload.updateDate = null
            //console.log(payload)

            //Unlink digital ID and student ID
            const unlinkDigitalID = await helper.putData(token, `${constants.digitalIdApiUrl}`, payload)
            console.log(unlinkDigitalID.studentID)

            if (constants.delete_digital_id === "true") {
                // Delete Digital ID
                const deleteDigitalID = await helper.deleteData(token, `${constants.digitalIdApiUrl}${digitalID}`)
                console.log(deleteDigitalID)
                log.info("DigitalID is deleted")
            }
            else {
                log.info("Not to delete the digital ID option is selected")
            }

        }
    }

})

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

