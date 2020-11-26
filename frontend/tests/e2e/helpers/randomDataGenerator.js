// var fs = require('fs')
// var faker = require("faker")


//Do not run this program 

// var data = {}
// data.studentData = []
// for (i = 0; i < 10; i++) {
//     var obj = {
//         pen: "" + faker.random.number({ min: 200000001, max: 299999999 }) + "",
//         legalLastName: faker.name.lastName(),
//         legalFirstName: faker.name.firstName(),
//         legalMiddleNames: null,
//         usualLastName: null,
//         usualFirstName: faker.name.firstName(),
//         usualMiddleNames: faker.name.firstName(),
//         dateOfBirth: faker.random.number({ min: 51, max: 93 }) + "-" + faker.random.number({ min: 10, max: 12 }) + "-" + faker.random.number({ min: 11, max: 25 }),
//         gender: "M",
//         postal: "V" + faker.random.number({ min: 1, max: 9 }) + "V" + faker.random.number({ min: 1, max: 9 }) + "S" + faker.random.number({ min: 1, max: 9 }),
//         mincode: "",
//         localID: "" + faker.random.number({ min: 111111111111, max: 999999999999 }) + "",
//         gradeCode: "" + faker.random.number({ min: 10, max: 12 }) + ""
//         //gradeCode: "GA"
//     }
//     data.studentData.push(obj)
// }
// fs.writeFile("dataset.json", JSON.stringify(data, null, 1), function (err) {
//     if (err) throw err;
//     console.log('complete');
// }
// );