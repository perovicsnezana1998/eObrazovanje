import { browser, element, by } from 'protractor';

describe('add student', () => {
  beforeEach(() => {
    browser.get('http://localhost:8080');
  });

  it('should add and delete student', () => {
    let menu = element(by.css('.navbar-toggler-icon'));
    menu.click();

	// find first link in the menu
    let studentsMenu = element(by.css('li > a:first-of-type')); 
	studentsMenu.click(); //opens students list
	expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/students');

	//wait for add button to be displayed
    let addButton = element(by.css('button[aria-label="Add"]'));

    //get number of students before adding new student
    let noOfStudents = 0;
	element.all(by.css('tr')).count().then( // count() returns promise
		function(value) {
			noOfStudents = value;
	});

	// open student-add page
	expect(addButton.isDisplayed()).toBe(true);
	addButton.click();

	// check the page is displayed
	expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/addStudent');

	//get input elements
	let inputCard  = element(by.id('field1c'));
	let inputFirstName  = element(by.id('field2c'));
	let inputLastName  = element(by.id('field3c'));

	expect(inputCard.isDisplayed()).toBe(true);
	expect(inputFirstName.isDisplayed()).toBe(true);
	expect(inputLastName.isDisplayed()).toBe(true);

	//enter student data
	inputCard.sendKeys("ra1-2016");
	inputFirstName.sendKeys("Dejan");
	inputLastName.sendKeys("Dejanović");

	//save test student
	let okButton = element(by.xpath('//button[2]'));
	okButton.click();

	//wait until student is added
	browser.wait(function() {
		return element.all(by.css('tr')).count().then(
			function(value) { 
				return value == (noOfStudents + 1); }
		 );
	}, 5000);

	//check that new student has been added
	let tdCardNumber = element(by.xpath("//tr[last()]/td[1]"));
	expect(tdCardNumber.getText()).toEqual('ra1-2016');
	let tdFirstName = element(by.xpath("//tr[last()]/td[2]"));
	expect(tdFirstName.getText()).toEqual('Dejan');
	let tdLastName = element(by.xpath("//tr[last()]/td[3]"));
	expect(tdLastName.getText()).toEqual('Dejanović');

	//delete test student
	var deleteButton = element(by.xpath('//tr[last()]/td[4]/button[2]'));
	deleteButton.click();	

	//wait until student is deleted
	browser.wait(function() {
		return element.all(by.css('tr')).count().then(
			function(value) { 
				return value == noOfStudents; }
		);
	});

	//check if student has been removed
    tdCardNumber = element(by.xpath("//tr[last()]/td[1]"));
	expect(tdCardNumber.getText()).not.toEqual('ra1-2016');
	tdFirstName = element(by.xpath("//tr[last()]/td[2]"));
	expect(tdFirstName.getText()).not.toEqual('Dejan');
	tdLastName = element(by.xpath("//tr[last()]/td[3]"));
	expect(tdLastName.getText()).not.toEqual('Dejanović');

  });
});
