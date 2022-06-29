import {Selector, t} from 'testcafe';

class NewUserPage {

  constructor() {
    this.firstNameInput = Selector('#newUserFirstName');
    this.lastNameInput = Selector('#newUserLastName');
    this.emailInput = Selector('#newUserEmail');
    this.schoolNameMincodeInput = Selector('#newUserSchool');
    this.rolesSelector = Selector('#newSchoolUserRolesSelect');
    this.rolesSelectorBox = Selector('div[role="listbox"]');
    this.inviteBtn=Selector('#newUserInvitePostBtn');
  }

  async selectRole(roleName){
    await t.click(this.rolesSelector).wait(10);
    await t.expect(this.rolesSelectorBox.exists).ok();
    await t.click(this.rolesSelectorBox.find('div').withExactText(roleName));
    await t.click(this.emailInput());
  }

  async verifyAccessAndUserInviteOperation() {
    await t.typeText(this.firstNameInput(), 'TestUserFirstName', {timeout: 20000})
      .typeText(this.lastNameInput(), 'TestUserLastName', {timeout: 20000})
      .typeText(this.emailInput(), 'penemail@mailsac.com', {timeout: 2000});

    await this.selectRole('Secure Exchange');
    await t.click(this.inviteBtn());
  }
}

export default NewUserPage;
