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
        await t.wait(5000)
    }

    async clickUploadPenRequestLink() {
        await t.click(this.uploadPenRequestLink)
        log.info("upload pen request link clicked")
    }


    async uploadDocument(data) {
        await t.setFilesToUpload((this.selectFile), [data])
        log.info('file uploaded')

    }


} export default penWebPage