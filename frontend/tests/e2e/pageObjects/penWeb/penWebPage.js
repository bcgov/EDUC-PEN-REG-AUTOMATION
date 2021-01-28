import { Selector, t } from 'testcafe'
const log = require('npmlog')


class penWebPage {

    constructor() {

        //Login related
        this.usernameInput = Selector('input').withAttribute('name', 'j_username')
        this.passwordInput = Selector('input').withAttribute('name', 'j_password')
        this.logonButton = Selector('input').withAttribute('name', 'Submit')


        //pen request related
        this.submitPenRequestLink = Selector('a').withText('Submit PEN Requests')
        this.surname = Selector('input').withAttribute('name', 'surname')
        this.firstname = Selector('input').withAttribute('name', 'firstname')
        this.middlename = Selector('input').withAttribute('name', 'middlename')
        this.preferredSurname = Selector('input').withAttribute('name', 'preferredSurname')
        this.preferredFirstname = Selector('input').withAttribute('name', 'preferredFirstname')
        this.preferredMiddlename = Selector('input').withAttribute('name', 'preferredMiddlename')
        this.birthDate = Selector('input').withAttribute('name', 'birthDate')
        this.genderM = Selector('input').withAttribute('value', 'M')
        this.genderF = Selector('input').withAttribute('value', 'F')
        this.postalCode = Selector('input').withAttribute('name', 'postalCode')
        this.localStudentNumber = Selector('input').withAttribute('name', 'localStudentNumber')
        this.attemptMatchButton = Selector('input').withAttribute('value', 'Attempt Match')



        //Upload pen request file
        this.uploadPenRequestLink = Selector('a').withText('Upload PEN Requests')
        this.selectFile = Selector('input').withAttribute('type', 'file')
    }

    async penWebLogin(credentials) {
        await t
            .typeText(this.usernameInput, credentials.username)
            .typeText(this.passwordInput, credentials.password)
            .click(this.logonButton)
        log.info("penWeb login complete")

    }

    async clickSubmitPenRequestLink() {
        await t.click(this.submitPenRequestLink)
        log.info("submit pen request link clicked")
    }

    async clickUploadPenRequestLink() {
        await t.click(this.uploadPenRequestLink)
        log.info("upload pen request link clicked")
    }


    async uploadDocument(data) {
        await t.setFilesToUpload((this.selectFile), [data])
        log.info('file uploaded')

    }


    async fillOutStudentInfo(studentData) {

        if (studentData.surname) {
            await t.typeText(this.surname, studentData.surname)
            log.info("surname entered")
        }

        if (studentData.firstname) {
            await t.typeText(this.firstname, studentData.firstname)
            log.info("firstname entered")
        }

        if (studentData.middlename) {
            await t.typeText(this.middlename, studentData.middlename)
            log.info("middlename entered")
        }

        if (studentData.preferredSurname) {
            await t.typeText(this.preferredSurname, studentData.preferredSurname)
            log.info("preferredSurname entered")
        }

        if (studentData.preferredFirstname) {
            await t.typeText(this.preferredFirstname, studentData.preferredFirstname)
            log.info("preferredFirstname entered")
        }

        if (studentData.preferredMiddlename) {
            await t.typeText(this.preferredMiddlename, studentData.preferredMiddlename)
            log.info("preferredMiddlename entered")
        }

        if (studentData.birthDate) {
            await t.typeText(this.birthDate, studentData.birthDate)
            log.info("birthDate entered")
        }

        if (studentData.genderM) {
            await t.click(this.genderM)
            log.info("Gender M selected")
        }

        if (studentData.genderF) {
            await t.click(this.genderF)
            log.info("Gender F selected")
        }

        if (studentData.postalCode) {
            await t.typeText(this.postalCode, studentData.postalCode)
            log.info("postalCode entered")
        }

        if (studentData.localStudentNumber) {
            await t.typeText(this.localStudentNumber, studentData.localStudentNumber)
            log.info("localStudentNumber entered")
        }

    }




} export default penWebPage