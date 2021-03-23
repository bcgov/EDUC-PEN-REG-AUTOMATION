import staffLoginPage from '../../../pageObjects/login/staffLoginPage';
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import staffPenRetrievalRequestPage from '../../../pageObjects/studentAdmin/gmp/staffPenRetrievalRequestsPage'
import staffActionOnPenPage from '../../../pageObjects/studentAdmin/gmp/staffActionOnPenPage'
import { idirReadOnlyCredentials, staffLoginUrl } from '../../../config/constants';
import studentData from '../../../config/studentData/studentData.json';
import staffData from '../../../config/staffData/staffData.json'

const staffLogin = new staffLoginPage()
const penPage = new staffPenRetrievalRequestPage()
const penAction = new staffActionOnPenPage()
const dashboard = new staffDashboardPage()

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and Can not perform any action on Pen request test', async t => {
    
    await staffLogin.stafflogin(idirReadOnlyCredentials,staffLoginUrl)

    await dashboard.clickViewGmpButton()

    await penPage.setMainStatusBar(staffData.Status[0])

    await penPage.setLastNameSearchBar(studentData.legalLastName)

    await penPage.setFirstNameSearchBar(studentData.legalFirstName)

    await penPage.clickStatusResultFirstElement(staffData.Status[0],studentData.legalLastName,studentData.legalFirstName)

    await penAction.verifyClaimConformation(staffData.NoOneWorkingOnThis)

    await penAction.clickClaimButton()

    await penAction.verifyClaimButtonDisabled()

    await penAction.verifyClaimConformation(staffData.NoOneWorkingOnThis)

    await penAction.clickRequestInfoButton()

    //await penAction.verifyReturnToStudentButtonDisabled()

    await penAction.clickReturnToStudentButtonReadOnly(staffData.Status[0])

});