import { IrunninglogAngularPage } from './app.po';

describe('irunninglog-angular App', () => {
  let page: IrunninglogAngularPage;

  beforeEach(() => {
    page = new IrunninglogAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
