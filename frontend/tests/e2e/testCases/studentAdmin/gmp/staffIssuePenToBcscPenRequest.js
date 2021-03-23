import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import staffPenRetrievalRequestPage from '../../../pageObjects/studentAdmin/gmp/staffPenRetrievalRequestsPage'
import staffActionOnPenPage from '../../../pageObjects/studentAdmin/gmp/staffActionOnPenPage'
import { idirAdminCredentials, staffLoginUrl, penNumber } from '../../../config/constants';
import bcscStudentData from '../../../config/studentData/bcscStudentData.json';
import staffData from '../../../config/staffData/staffData.json'
import penDemographics from '../../../config/staffData/penDemographics.json'

const staffLogin = new staffLoginPage()
const penPage = new staffPenRetrievalRequestPage()
const penAction = new staffActionOnPenPage()
const dashboard = new staffDashboardPage()

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and issue pen to Student test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials)

    await dashboard.clickViewGmpButton()

    await penPage.setMainStatusBar(staffData.Status[0])

    await penPage.setLastNameSearchBar(bcscStudentData.legalLastName)

    await penPage.setFirstNameSearchBar(bcscStudentData.legalFirstName)

    await penPage.verifyDateAndTimeFormat()

    await penPage.clickStatusResultFirstElement(staffData.Status[0],studentData.legalLastName,studentData.legalFirstName)

    await penAction.clickClaimButton()

    await penAction.verifyClaimConformation(staffData.ClaimConformationText)

    await penAction.clickProvidePenButton()

    await penAction.providePenNumber(penNumber)

    await penAction.clickProvidePenToStudentButton(staffData.Status[3])

    await penAction.verifyasOfDate()

    await penAction.verifySubmittedDate()

    await penAction.actionConfirmationText(idirAdminCredentials.username)

    await penAction.verifyPenDemographics(penNumber,penDemographics)

});
