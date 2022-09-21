import staffLoginPage from '../../../../pageObjects/login/staffLoginPage'
import {idirAdminCredentials, staffLoginUrl, student_penList} from '../../../../config/constants';

import log from 'npmlog';

import Inbox from '../../../../pageObjects/studentAdmin/exchange/exchangePage';
import MessageDisplayPage from "../../../../pageObjects/studentAdmin/exchange/messageDisplayPage";
import staffDashboardPage from '../../../../pageObjects/studentAdmin/dashboard/staffDashboardPage'
import {t} from "testcafe";
//import DocumentUploadPage  from "../../page_models/common/documentUploadPage";

const staffLogin = new staffLoginPage();
const testExchangeSubject = 'Created by test automation';
const testExchangeMessage = 'Created by test automation'
const testNoteText = 'Note text from automation test.';
const dashboard = new staffDashboardPage();
const inbox = new Inbox();
const messageDisplay = new MessageDisplayPage();
//const documentUpload = new DocumentUploadPage();
/**
 * Tests to run against the admin inbox page
 */

fixture`school-inbox-new-message`
  .page(staffLoginUrl)
  .beforeEach(async t => {
    //await t.maximizeWindow();
  });
/*
test('test-send-new-message-with-students', async t => {

  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);
  await dashboard.verifyPenInboxButtonIsAvailable();
  await dashboard.clickViewPenInboxButton();

  await inbox.clickNewMessageButton();
  await inbox.checkAddStudentButtonToMsgIsDisabled();
  await inbox.setSubject(testExchangeSubject);
  await inbox.clickSetSchoolName();
  await inbox.selectSchoolNameOptionByIndex();
  const penArr = student_penList;
  //test invalid pen number input
  await inbox.clickOnAddStudentButtonInNewMessage();
  await inbox.addStudentPenToSearchInNewMessage('123456789');
  await inbox.checkSearchPenButtonIsDisabled();

  await inbox.checkAddStudentButtonIsDisabled();

  //test valid pen number input
  await inbox.clearPenSearchText();
  await inbox.addStudentPenToSearchInNewMessage(penArr[0]);
  await inbox.checkSearchPenButtonIsEnabled();
  await inbox.checkAddStudentButtonIsDisabled();
  await inbox.clickPenSearchButton();
  await inbox.checkAddStudentButtonIsEnabled();
  await inbox.clickAddStudentButton();
  await inbox.studentAddedToNewMessageWithPen(penArr[0]);

  //test adding additional pen number which does not belong to the same mincode
  await inbox.clickOnAddStudentButtonInNewMessage();
  await inbox.assertAlertMessageAtAddStudent('Additional students should only be added if the details are relevant to this request. Requests for separate students should be sent in a new message.');
  await inbox.addStudentPenToSearchInNewMessage(penArr[1]);
  await inbox.checkSearchPenButtonIsEnabled();
  await inbox.clickPenSearchButton();
  await inbox.checkAddStudentButtonIsEnabled();
  await inbox.clickAddStudentButton();

  //test adding a student that doesn't exist
  await inbox.clickOnAddStudentButtonInNewMessage();
  await inbox.assertAlertMessageAtAddStudent('Additional students should only be added if the details are relevant to this request. Requests for separate students should be sent in a new message.');
  await inbox.addStudentPenToSearchInNewMessage(penArr[2]);
  await inbox.clickPenSearchButton();
  await inbox.assertAlertMessageAtAddStudent('No student record was found for pen :: 191900943');
  await inbox.checkAddStudentButtonIsDisabled();
  await inbox.clickCancelAddStudentButton();

  await inbox.clickNewMessagePostButton();
  log.info('Message created.');
});*/

test('test-add-note-to-message', async t => {
  await staffLogin.stafflogin(idirAdminCredentials, staffLoginUrl);
  await dashboard.verifyPenInboxButtonIsAvailable();
  await dashboard.clickViewPenInboxButton();

  await inbox.clickNewMessageButton();
  await inbox.checkAddStudentButtonToMsgIsDisabled();
  await inbox.setSubject(testExchangeSubject);
  await inbox.setNewMessageText(testExchangeMessage);
  await inbox.clickSetSchoolName();
  await inbox.selectSchoolNameOptionByIndex();
  await inbox.clickNewMessagePostButton();
  await t.wait(2000)
  await inbox.clickNthRow(1);

  await messageDisplay.clickEditOptionsMenu();
  await messageDisplay.clickNoteButton();
  await messageDisplay.setNoteText(testNoteText);
  await messageDisplay.clickSaveNoteButton();

  await messageDisplay.verifyNewNoteSent();
});
/*
test('test-send-new-message-with-attachment', async t => {
  await t.navigateTo(base_url);
  await dashboard.clickSchoolInboxCard();

  await inbox.createANewMessage(testExchangeSubject);
  await inbox.clickAttachFileButton();

  //attach document
  await documentUpload.clickDocumentTypeSelect();
  await documentUpload.selectDocumentTypeByName('Canadian Citizenship Card')
  await documentUpload.uploadDocument('../../uploads/BC.jpg');
  await documentUpload.clickUploadButton();
  await inbox.clickNewMessagePostButton();

  //find the message
  await inbox.clickFiltersToggle();
  await inbox.inputSubject('Created by test automation');
  await inbox.selectContactName('PEN Team');
  await inbox.selectStatus('Open');
  await inbox.clickSearchButton();
  await inbox.clickNthTableRow(0);

  //verify message detail
  await messageDisplay.verifyTimelineAttachmentByText('BC.jpg');
});
*/



