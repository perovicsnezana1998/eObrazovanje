import { browser, element, by } from 'protractor';
import { MenuPage } from './page-objects/menu.po';
import { StudentListPage } from './page-objects/student-list.po';
import { StudentEditPage } from './page-objects/student-edit.po';

describe('add student', () => {
  let menuPage: MenuPage;	
  let studentListPage: StudentListPage;
  let studentEditPage: StudentEditPage;

  beforeEach(() => {
  	menuPage = new MenuPage();
  	studentListPage = new StudentListPage();
  	studentEditPage = new StudentEditPage();
    browser.get('http://localhost:8080');
  });

  it('should add and delete student using page objects', () => {
  	menuPage.getMainMenuLink().click();
  	menuPage.getStudentsLink().click();
	expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/students');
	
	//get number of students before adding new student
	let noOfStudents = {'value': 0}; //object to be sent by reference
    studentListPage.getTableRows().count().then(
    	function(value) {
			noOfStudents.value = value;
	});

	// open student-add page
	expect(studentListPage.getAddButton().isDisplayed()).toBe(true);
	studentListPage.getAddButton().click();

	// check the page is displayed
	expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/addStudent');

	expect(studentEditPage.getInputCard().isDisplayed()).toBe(true);
	expect(studentEditPage.getInputFirstName().isDisplayed()).toBe(true);
	expect(studentEditPage.getInputLastName().isDisplayed()).toBe(true);

	//enter student data
	studentEditPage.setInputCard('ra1-2016');
	studentEditPage.setInputFirstName('Dejan');
	studentEditPage.setInputLastName('Dejanović');

	//save test student
	studentEditPage.getOkButton().click();

	//wait until student is added
	//we sent noOfStudents object by reference
	//noOfStudents.value is 0 when we call the function, but it will
	//be changed later by tableRows.count().then() above
	studentListPage.ensureIsAdded(noOfStudents);
	
	//check that new student has been added
	expect(studentListPage.getLastTdCard().getText()).toEqual('ra1-2016');
	expect(studentListPage.getLastTdFirstName().getText()).toEqual('Dejan');
	expect(studentListPage.getLastTdLastName().getText()).toEqual('Dejanović');

	//delete test student
	studentListPage.getDeleteButton().click();	

	//wait until student is deleted
	studentListPage.ensureIsDeleted(noOfStudents);

	//check if student has been removed	
	expect(studentListPage.getLastTdCard().getText()).not.toEqual('ra1-2016');
	expect(studentListPage.getLastTdFirstName().getText()).not.toEqual('Dejan');
	expect(studentListPage.getLastTdLastName().getText()).not.toEqual('Dejanović');
  });
});
