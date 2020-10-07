// var config = require('../config/index')
// var faker = require("faker")
// var fs = require("fs")
// const log = require('npmlog')

//Do not run this program 

// var studentData = {
//     //legalLastName:  config.get('bceid:user'),
//     legalLastName: "Automation",
//     legalFirstName: faker.name.firstName(),
//     legalMiddleNames: faker.name.lastName(),
//     maidenName: faker.name.lastName(),
//     usualLastName: faker.name.lastName(),
//     usualFirstName: faker.name.firstName(),
//     usualMiddleNames: faker.name.firstName(),
//     pastNames: faker.name.lastName(),
//     dateOfBirth: {
//         date: faker.random.number({ min: 1, max: 28 }),
//         month: faker.random.number({ min: 1, max: 12 }),
//         year: faker.random.number({ min: 1970, max: 2005 })
//     },
//     gender: faker.random.number({ min: 1, max: 3 }),
//     email: "penemail@mailsac.com",
//     lastBCSchool: faker.address.city() + ' Middle School',
//     lastBCStudentNumber: String(faker.random.number()),
//     currentSchool: faker.address.city() + ' High School',
//     respondHereText: "Attached the document",
//     uploadFileLocation: "../uploads/BC.jpeg",
//     emailVerificationText: "Your email has been verified and your PEN request has now been submitted for processing."
// };

// fs.writeFileSync("./tests/e2e/config/studentData.json", JSON.stringify(studentData, null, 1), (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     log.info("created Student data json file");
// });

