import { browser, element, by } from 'protractor';

export class StudentListPage {
  getAddButton() {
  	return element(by.css('button[aria-label="Add"]'));
  }

  getLastTdCard() {
  	return element(by.xpath('//tr[last()]/td[1]'));
  }

  getLastTdFirstName() {
  	return element(by.xpath('//tr[last()]/td[2]'));
  }

  getLastTdLastName() {
  	return element(by.xpath('//tr[last()]/td[3]'));
  }

  getDeleteButton() {
   	return element(by.xpath('//tr[last()]/td[4]/button[2]'));
  }

  getTableRows() {
    return element.all(by.css('tr'));
  }

  ensureIsAdded(noOfStudents: any) {
        browser.wait(() => {
          return this.getTableRows().count().then(
              (value) => value == (noOfStudents.value + 1));
      }, 5000);      
  }

  ensureIsDeleted(noOfStudents: any) {
        browser.wait(() => {
          return this.getTableRows().count().then(
            (value) => value == noOfStudents.value);
      }, 5000);
    }
}
