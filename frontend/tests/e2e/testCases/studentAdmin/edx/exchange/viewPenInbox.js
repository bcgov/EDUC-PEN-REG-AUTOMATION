import staffLoginPage from '../../../../pageObjects/login/staffLoginPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../../config/constants'
import staffDashboardPage from '../../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import ExchangePage from '../../../../pageObjects/studentAdmin/exchange/exchangePage'
import MessageDisplayPage
  from "../../../../pageObjects/studentAdmin/exchange/messageDisplayPage";

const staffLogin = new staffLoginPage()
const exchange = new ExchangePage()
const dashboard = new staffDashboardPage()
const messageDetail = new MessageDisplayPage()


fixture`Student Admin`
.page(staffLoginUrl)
.beforeEach(async t => {
  // await t.setTestSpeed(0.8)
  await t.maximizeWindow()
})

test('Staff view Pen inbox navigation test', async t => {

  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

  await dashboard.clickViewPenInboxButton()

  //create a new exchange message
  await exchange.clickNewMessageButton()
  await exchange.clickSetSchoolName()
  await exchange.selectSchoolByName('Wildflower')
  await exchange.setSubject('automation test')
  await exchange.setNewMessageText('automation test')
  await exchange.clickNewMessagePostButton()

  //search for exchange message and check search results
  await exchange.clickMoreFilterButton()
  await exchange.setSubjectSearch('automation test')
  await exchange.setClaimedBy('PENREG1')
  await exchange.selectStatus('Open')
  await exchange.selectMessageDate()
  await exchange.selectContactFilterSchoolByName('Wildflower')
  await exchange.clickSearchFilterButton()
  await exchange.verifySearchResults()

  //claim the message
  await exchange.selectFirstTableRow()
  await exchange.clickClaimButton()
  await exchange.verifyClaimSnackbar();

  //verify message details are correct
  await exchange.clickNthRow(1)
  await messageDetail.verifyMessageDetail()

})