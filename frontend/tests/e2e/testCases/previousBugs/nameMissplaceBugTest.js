import staffLoginPage from '../../pageObjects/login/staffLoginPage';
import staffPenRetrievalRequestPage from '../../pageObjects/admin/staffPenRetrievalRequestsPage'
import staffActionOnPenPage from '../../pageObjects/admin/staffActionOnPenPage'
import { idirAdminCredentials, staffLoginUrl, penNumber } from '../../config/constants';



const staffLogin = new staffLoginPage()
const penPage = new staffPenRetrievalRequestPage()
const penAction = new staffActionOnPenPage()

fixture`Staff login and issue pen to Student`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and issue pen to Student test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    // First Application

    const name1 = await penPage.grabLastnameStudent1()

    await penPage.clickStatusResultFirstElement()

    await penAction.clickClaimButton()

    await penAction.clickProvidePenButton()

    await penAction.providePenNumber(penNumber)

    await penAction.clickProvidePenToStudentButton()

    // Second application

    await penAction.clickBackToListButton()

    const name2 = await penPage.grabLastnameStudent2()

    await penPage.clickStatusResultSecondElement()

    await t.wait(15000)

    await penAction.clickProvidePenButton()

    await penAction.providePenNumber(penNumber)

    await penAction.clickProvidePenToStudentButton()

    await t.wait(15000)

    await penAction.checkLastName(name1)

});