const { getToken } = require('./generateToken')

getToken().then(async (data) => {


    const token = data.access_token
    console.log("token    " + token)

})

    .catch((error => {
        console.log(error)
        throw new Error("Test failed")
    }))

