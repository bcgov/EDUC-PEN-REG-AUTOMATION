import staffLoginPage from '../../../../pageObjects/login/staffLoginPage'
import { idirAdminCredentials, staffLoginUrl } from '../../../../config/constants'
import staffDashboardPage from '../../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import exchangePage from '../../../../pageObjects/studentAdmin/exchange/exchangePage'
import newMessagePage from '../../../../pageObjects/studentAdmin/exchange/newMessagePage'
import messageDetailPage
  from "../../../../pageObjects/studentAdmin/exchange/messageDetailPage";

const staffLogin = new staffLoginPage()
const exchange = new exchangePage()
const dashboard = new staffDashboardPage()
const newMessage = new newMessagePage()
const messageDetail = new messageDetailPage()


fixture`Student Admin`
.page(staffLoginUrl)
.beforeEach(async t => {
  await t.maximizeWindow()
})

test('Staff view Pen inbox navigation test', async t => {

  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)

  await dashboard.clickViewPenInboxButton()

  //create a new exchange message
  await exchange.clickNewMessageButton()
  await newMessage.clickSetSchoolName()
  await newMessage.selectSchoolNameOption('Victoria High (06161018)')
  await newMessage.setSubject('automation test')
  await newMessage.setNewMessageText('automation test')
  await newMessage.clickNewMessagePostButton()

  //search for exchange message and check search results
  await exchange.setSubjectSearch('automation test')
  await exchange.setReviewerSearch('PENREG1')
  await exchange.verifySearchResults()

  //verify message details are correct
  await exchange.clickNthRow(1)
  await messageDetail.verifyMessageDetail()

}).after(t => {console.log('could run cleanup here');})