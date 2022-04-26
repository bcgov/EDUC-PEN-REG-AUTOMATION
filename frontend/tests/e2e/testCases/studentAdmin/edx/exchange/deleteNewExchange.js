const helper = require("../../../../helpers/axios-helper")
const constants = require('../../../../config/constants')
const { getToken } = require('../../../../helpers/generateToken')

getToken().then(async (data) => {

  await new Promise(sleep => setTimeout(sleep, 60000));
  console.log("Implicit wait completed")

  const token = data.access_token

  let searchListCriteria = []

  searchListCriteria.push({ key: 'subject', operation: 'eq', value: 'automation test' , valueType: 'STRING' });
  searchListCriteria.push({ key: 'reviewer', operation: 'eq', value: constants.idirAdminCredentials.username , valueType: 'STRING' });

  const search = [
    {
      searchCriteriaList: searchListCriteria
    }
  ]
  const filterParam = {
    params: {
      searchCriteriaList: JSON.stringify(search)
    }
  }

  //Get Exchange message on EDX service
  const getEDXService = await helper.getData(token, `${constants.EDXApiUrl}paginated`, filterParam)
  //console.log(getEDXService)

  //Get Secure Exchange ID
  const secureExchangeID = getEDXService.content[0].secureExchangeID
  //console.log("Secure Exchange ID" + secureExchangeID)

  //Delete Secure Exchange Record on EDX service
  const deleteEDXService = await helper.deleteData(token, `${constants.EDXApiUrl}${secureExchangeID}`)
  //console.log(deleteEDXService)

})

.catch((error => {
  console.log(error)
  throw new Error("Test failed")
}))

