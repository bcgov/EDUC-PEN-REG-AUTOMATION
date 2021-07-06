import staffLoginPage from '../../pageObjects/login/staffLoginPage'
import { idirAdminCredentials, staffLoginUrl } from '../../config/constants'
import createNewPenPage from '../../pageObjects/studentAdmin/createNewPen/createNewPenPage'
import staffActionOnPenPage from '../../pageObjects/studentAdmin/gmp/staffActionOnPenPage'
import staffPenRetrievalRequestPage from '../../pageObjects/studentAdmin/gmp/staffPenRetrievalRequestsPage'
import studentData from '../../config/studentData/studentData.json';
import staffData from '../../config/staffData/staffData.json'
import staffDashboardPage from '../../pageObjects/studentAdmin/dashboard/staffDashboardPage'


const staffLogin = new staffLoginPage()
const create = new createNewPenPage()
const penPage = new staffPenRetrievalRequestPage()
const penAction = new staffActionOnPenPage()
const dashboard = new staffDashboardPage()

fixture`Maintenance`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Gmp Session Timeout test', async t => {

    await staffLogin.stafflogin(idirAdminCredentials,staffLoginUrl)

    await dashboard.clickViewGmpButton()

    await create.implicitWait(1)

    await penPage.setMainStatusBar(staffData.Status[0])

    await penPage.setLastNameSearchBar(studentData.legalLastName)

    await penPage.setFirstNameSearchBar(studentData.legalFirstName)

    await penPage.clickStatusResultFirstElement(staffData.Status[0])

    await penAction.clickClaimButton()

    await penAction.verifyClaimConformation(staffData.ClaimConformationText)

    await penAction.clickRequestInfoButton()

    await penAction.setRequestInfoTextBox(staffData.RequestInformation)

    await penAction.clickReturnToStudentButton(staffData.Status[6])

    await penAction.clickBackToListButton()

    //Round one complete


    await create.implicitWait(2)

    await penPage.setMainStatusBar(staffData.Status[6])

    await penPage.setLastNameSearchBar(studentData.legalLastName)

    await penPage.setFirstNameSearchBar(studentData.legalFirstName)

    await penPage.clickStatusResultFirstElement(staffData.Status[6])

    await penAction.clickRejectButton()

    await penAction.setRejectTextBox(staffData.RejectInformation)

    await penAction.clickRejectPenRequestButton(staffData.Status[4])

    await penAction.clickBackToListButton()

    //Round two complete    


    await create.implicitWait(3)

    await penPage.setMainStatusBar(staffData.Status[4])

    await penPage.setLastNameSearchBar(studentData.legalLastName)

    await penPage.setFirstNameSearchBar(studentData.legalFirstName)

    await penPage.clickStatusResultFirstElement(staffData.Status[4])

    await penAction.waitForRejectButton()

    await penAction.clickRequestInfoButton()

    await penAction.setRequestInfoTextBox(staffData.RequestInformation)

    await penAction.clickReturnToStudentButton(staffData.Status[6])

    await penAction.clickBackToListButton()

    //Round Three complete


    await create.implicitWait(4)

    await penPage.setMainStatusBar(staffData.Status[6])

    await penPage.setLastNameSearchBar(studentData.legalLastName)

    await penPage.setFirstNameSearchBar(studentData.legalFirstName)

    await penPage.clickStatusResultFirstElement(staffData.Status[6])

    await penAction.clickRejectButton()

    await penAction.setRejectTextBox(staffData.RejectInformation)

    await penAction.clickRejectPenRequestButton(staffData.Status[4])

    await penAction.clickBackToListButton()

    //Round Four Complete

})