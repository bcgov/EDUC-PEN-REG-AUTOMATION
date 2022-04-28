const helper = require("../../../../helpers/axios-helper")
const constants = require('../../../../config/constants')
const { getToken } = require('../../../../helpers/generateToken')

getToken().then(async (data) => {
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
  if (getEDXService.content && getEDXService.content.length > 0) {
    //Get Secure Exchange ID
    const secureExchangeID = getEDXService.content[0].secureExchangeID
    //console.log("Secure Exchange ID" + secureExchangeID)

    //Delete Secure Exchange Record on EDX service
    await helper.deleteData(token, `${constants.EDXApiUrl}${secureExchangeID}`)
  } else {
    console.log('unable to find exchange message to delete')
  }

})

.catch((error => {
  console.log(error)
  throw new Error("Test failed")
}))

