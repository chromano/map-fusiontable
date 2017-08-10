import { MapPage } from './app.po';

describe('map App', () => {
  let page: MapPage;

  beforeEach(() => {
    page = new MapPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
