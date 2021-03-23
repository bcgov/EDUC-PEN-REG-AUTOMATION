import staffLoginPage from '../../../pageObjects/login/staffLoginPage'
import staffDashboardPage from '../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import staffUmpRequestsPage from '../../../pageObjects/studentAdmin/ump/staffUmpRequestsPage'
import staffActionOnUmpPage from '../../../pageObjects/studentAdmin/ump/staffActionOnUmpPage'
import { idirReadOnlyCredentials, staffLoginUrl, penNumber } from '../../../config/constants'
import staffData from '../../../config/staffData/staffData.json'


const staffLogin = new staffLoginPage()
const umpAction = new staffActionOnUmpPage()
const umpPage = new staffUmpRequestsPage()
const dashboard = new staffDashboardPage()

fixture`Student Admin`
    .page(staffLoginUrl)
    .beforeEach(async t => {
        await t.maximizeWindow()
    })

test('Staff login and Can not perform any action on Ump request test', async t => {

    await staffLogin.stafflogin(idirReadOnlyCredentials,staffLoginUrl)

    await dashboard.clickViewUmpButton()

    await umpPage.setMainStatusBar(staffData.Status[0])

    await umpPage.setPenNumberSearchBar(penNumber)

    await umpPage.clickStatusResultFirstElement(staffData.Status[0],penNumber)

    await umpAction.verifyClaimConformation(staffData.NoOneWorkingOnThis)

    await umpAction.clickClaimButton()

    await umpAction.verifyClaimButtonDisabled()

    await umpAction.verifyClaimConformation(staffData.NoOneWorkingOnThis)

    await umpAction.clickRejectButton()

    //await umpAction.verifyRejectButtonDisabled()

    await umpAction.clickRejectButtonReadOnly(staffData.Status[0])

});