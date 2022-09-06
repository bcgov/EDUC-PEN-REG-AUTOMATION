import staffLoginPage from '../../../../pageObjects/login/staffLoginPage';
import { idirAdminCredentials, idirReadOnlyCredentials, staffLoginUrl } from '../../../../config/constants';
import staffDashboardPage from '../../../../pageObjects/studentAdmin/dashboard/staffDashboardPage';
import ExchangePage from '../../../../pageObjects/studentAdmin/exchange/exchangePage';
import MessageDisplayPage
  from "../../../../pageObjects/studentAdmin/exchange/messageDisplayPage";
import UnauthorizedPage from "../../../../pageObjects/errors/UnauthorizedPage";
import DocumentUploadPage
  from "../../../../pageObjects/studentAdmin/common/documentUploadPage";

import exchangeData from '../../../../config/exchangeData/exchangeSecureMessageData.json';
import StaffHamburgerMenuPage from '../../../../pageObjects/studentAdmin/dashboard/staffHamburgerMenuPage';

const staffLogin = new staffLoginPage();
const exchange = new ExchangePage();
const staffHamburgerMenuPage = new StaffHamburgerMenuPage();
const dashboard = new staffDashboardPage()
const messageDetail = new MessageDisplayPage()
const documentUpload = new DocumentUploadPage();

const unauthorizedPage = new UnauthorizedPage();


fixture`Student Admin`
.page(staffLoginUrl)
.beforeEach(async t => {
  await t.maximizeWindow();
})

test('Staff view Pen inbox navigation test', async t => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl)
  await dashboard.verifyPenInboxButtonIsAvailable();
  await dashboard.clickViewPenInboxButton()

  //create a new exchange message with attachment
  await exchange.clickNewMessageButton()
  await exchange.clickSetSchoolName()
  await exchange.selectSchoolByName('Wildflower')
  await exchange.setSubject('automation test')
  await exchange.setNewMessageText('automation test')
  await exchange.clickAttachFileButton();
  await documentUpload.uploadDocument(exchangeData.uploadFileLocation);
  await documentUpload.clickUploadButton();
  await exchange.clickAttachFileButton();
  await documentUpload.uploadDocument(exchangeData.uploadFileLocation15MbPdf);
  await documentUpload.verifyMaxFileSizeError();
  await documentUpload.clickCancelButton();
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

  //verify message details are correct and attach a document
  await exchange.clickNthRow(1);
  await messageDetail.clickEditOptionsMenu();
  await messageDetail.clickAttachmentsButton();
  await documentUpload.uploadDocument(exchangeData.uploadFileLocation10MbJpg);
  await documentUpload.clickUploadButton();
  await messageDetail.verifyMessageDetail();
});

test('Staff view Pen inbox and Add a new comment to an Existing Exchange', async _t => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);
  await dashboard.verifyPenInboxButtonIsAvailable();
  await dashboard.clickViewPenInboxButton();

  //filter to the message at the message already exists from previous test
  await exchange.clickMoreFilterButton();
  await exchange.setSubjectSearch('automation test');
  await exchange.setClaimedBy('PENREG1');
  await exchange.selectStatus('Open');
  await exchange.selectMessageDate();
  await exchange.selectContactFilterSchoolByName('Wildflower');
  await exchange.clickSearchFilterButton();
  await exchange.verifySearchResults();

  await exchange.clickNthRow(1);
  await messageDetail.clickOnNewMessage();
  await messageDetail.sendANewMessageToTheExistingExchange();
  await messageDetail.verifyNewCommentSent();

});

test('Only authenticated staff can view PEN Team Inbox', async _t => {
  await staffLogin.stafflogin(idirReadOnlyCredentials, staffLoginUrl);

  await staffHamburgerMenuPage.clickHamburgerMenu();
  await staffHamburgerMenuPage.verifyEdxInboxMenuOptionIsNotAvailable();
  await staffHamburgerMenuPage.verifyEdxPenTeamInboxLinkIsNotAvailable();
  await staffHamburgerMenuPage.clickHamburgerMenu();

  await dashboard.verifyPenInboxButtonIsNotAvailable();
  await unauthorizedPage.forceNavigate(`${staffLoginUrl}edx/exchange/PEN_TEAM_ROLE`);
  await unauthorizedPage.verifyIsOnUnauthorizedPage();
  await unauthorizedPage.verifyErrorText();
  await unauthorizedPage.verifyErrorMessage();
});

test('Navigate to PEN Team Inbox via Hamburger', async _t => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);

  await staffHamburgerMenuPage.clickHamburgerMenu();
  await staffHamburgerMenuPage.verifyEdxInboxMenuOptionIsAvailable();
  await staffHamburgerMenuPage.clickEdxInboxMenuOption();
  await staffHamburgerMenuPage.verifyEdxPenTeamInboxLinkIsAvailable();
  await staffHamburgerMenuPage.clickEdxPenTeamInboxLink();

  await exchange.verifyMinistryTeamInboxTitle('PEN Team Inbox');
});