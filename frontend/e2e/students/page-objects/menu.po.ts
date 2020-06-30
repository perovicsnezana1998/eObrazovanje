import { browser, element, by } from 'protractor';

export class MenuPage {
  
  getMainMenuLink() {
  	return element(by.css('.navbar-toggler-icon'));
  }

  getStudentsLink() {
  	return element(by.css('li > a:first-of-type'));
  }
}
