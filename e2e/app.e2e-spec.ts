import { AssessPage } from './app.po';

describe('assess App', () => {
  let page: AssessPage;

  beforeEach(() => {
    page = new AssessPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
