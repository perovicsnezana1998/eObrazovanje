import { browser, element, by } from 'protractor';

export class StudentEditPage {
  getInputCard() {
  	return element(by.id('field1c'));
  }

  getInputFirstName() {
  	return element(by.id('field2c'));
  }

  getInputLastName() {
  	return element(by.id('field3c'));
  }

  getOkButton() {
  	return element(by.xpath('//button[2]'));
  }

  setInputCard(text: string) {
  	this.getInputCard().sendKeys(text);
  }

  setInputFirstName(text: string) {
  	this.getInputFirstName().sendKeys(text);
  }

  setInputLastName(text: string) {
  	this.getInputLastName().sendKeys(text);
  }
}