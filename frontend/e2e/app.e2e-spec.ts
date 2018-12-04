import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('frontend App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('News App');
  });

  it('should be redirected to /login route on openning application', () => {
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should register test6 user', () => {
    browser.element(by.css('[href="#collapse2"]')).click();
    browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    browser.element(by.id('rUserid')).sendKeys('test10');
    browser.element(by.id('rFirstName')).sendKeys('test');
    browser.element(by.id('rLastName')).sendKeys('10');
    browser.element(by.id('rPassword')).sendKeys('123');
    browser.element(by.id('rConfirmPassword')).sendKeys('123');
    browser.pause();
    browser.element(by.id('registerButton')).click();
    browser.element(by.css('[href="#collapse1"]')).click();
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should login with the registered user', () => {
    browser.executeScript('window.scrollTo(0, 0)');
    browser.element(by.id('userid')).sendKeys('test8');
    browser.element(by.id('password')).sendKeys('123');
    browser.pause();
    browser.element(by.id('loginButton')).click();
  });

  it('should navigate to /home page on logging in', () => {
    expect(browser.getCurrentUrl()).toContain('/home');
    browser.driver.manage().window().maximize();
    browser.sleep(2000);
  });

  it('should search based on searchterm', () => {
    browser.element(by.id('search-text')).sendKeys('nokia');
    browser.element(by.id('search-btn')).click();
    browser.sleep(4000);
    browser.element(by.id('dashboardButton')).click();
    browser.sleep(4000);
  });

  it('should be able to add article to favorites', () => {
    const arts = element.all(by.css('.favorite-btn'));
    expect(arts.count()).toBe(10);
    arts.get(0).click();
    browser.sleep(2000);
  });

  it('should navigate to /favorites page on clicking on Favorites menu button', () => {
    browser.element(by.id('favoritesButton')).click();
    expect(browser.getCurrentUrl()).toContain('/favorites');
    browser.sleep(5000);
  });

  it('should navigate to /home page on clicking on Dashboard menu button', () => {
    browser.element(by.id('dashboardButton')).click();
    expect(browser.getCurrentUrl()).toContain('/home');
    browser.sleep(2000);
    browser.executeScript('document.getElementById("cnews").scrollIntoView()');
    browser.sleep(2000);
  });

  it('should change the category and display the articles', () => {
    browser.element(by.id('catdropdown')).click();
    browser.sleep(2000);
    const itms = element.all(by.css('.dropdown-item'));
    expect(itms.count()).toBe(7);
    itms.get(1).click();
    browser.sleep(5000);
    const arts = element.all(by.css('.favorite-btn'));
    expect(arts.count()).toBe(10);
    arts.get(7).click();
    browser.sleep(2000);
    browser.element(by.id('favoritesButton')).click();
    browser.sleep(5000);
  });

  it('should remove the article from favorites', () => {
    const arts = element.all(by.css('.unfavorite-btn'));
    expect(arts.count()).toBeGreaterThan(0);
    arts.get(0).click();
    browser.sleep(2000);
  });

});
