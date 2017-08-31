import { RolePermissionPage } from './app.po';

describe('role-permission App', () => {
  let page: RolePermissionPage;

  beforeEach(() => {
    page = new RolePermissionPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
