import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { async, fakeAsync, tick } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core'

import { StudentDetailComponent } from './student-detail.component';
import { StudentService } from '../students/student.service';
import { ActivatedRouteStub } from '../testing/router-stubs';
import { Student } from "app/model/student.model";

describe('StudentDetailComponent', () => {
  let componentForAdd: StudentDetailComponent;
  let fixture: ComponentFixture<StudentDetailComponent>;
  let studentService: any;
  let activatedRoute: any;
  let location: any;

 beforeEach(() => {
    let studentServiceMock = {
      getStudent: jasmine.createSpy('getStudent')
        .and.returnValue(Promise.resolve(new Student({
            id: 1,
            cardNumber: 'a123',
            firstName: 'Petar',
            lastName: 'Petrovic'            
         	}))),
      getStudentEnrollments: jasmine.createSpy('getStudentEnrollments')
        .and.returnValue(Promise.resolve([
          {
            id: 1,
            startDate: Date.UTC(2016, 0, 1),
            endDate: Date.UTC(2017, 0, 1),
            student: {
                id: 1,
                cardNumber: 'a123',
                firstName: 'Petar',
                lastName: 'Petrovic'            
            }, 
            course: {
              id: 7,
              name: 'Matematika'
            }
          },
          {
            id: 2,
            startDate: Date.UTC(2015, 0, 1),
            endDate: Date.UTC(2016, 0, 1),
            student: {
                id: 1,
                cardNumber: 'a123',
                firstName: 'Petar',
                lastName: 'Petrovic'           
            }, 
            course: {
              id: 8,
              name: 'Programiranje'
            }
          }])),
      addStudent: jasmine.createSpy('addStudent')
          .and.returnValue(Promise.resolve()),
      editStudent: jasmine.createSpy('editStudent')
          .and.returnValue(Promise.resolve()),
      announceChange: jasmine.createSpy('announceChange') 
    };

    let locationMock = {
      back: jasmine.createSpy('back')
    };

    let activatedRouteStub: ActivatedRouteStub = new ActivatedRouteStub();
    activatedRouteStub.testParams = { id: 1 } ; // we edit a student with id 1. Its id is in route url

    TestBed.configureTestingModule({
       declarations: [ StudentDetailComponent ],
       imports: [ FormsModule ],
       providers:    [ 
        {provide: StudentService, useValue: studentServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Location, useValue: locationMock} ]
    });

    fixture = TestBed.createComponent(StudentDetailComponent);
    componentForAdd = fixture.componentInstance;
    studentService = TestBed.get(StudentService);
    activatedRoute = TestBed.get(ActivatedRoute);
    location = TestBed.get(Location);
  }); 
  
  it('should fetch student and his enrollments on init in edit mode', fakeAsync(() => {
    componentForAdd.ngOnInit();
    expect(studentService.getStudent).toHaveBeenCalledWith(1); // we fetch student 1 since route param is 1
    tick();
    // should fetch student from service
    expect(componentForAdd.student.id).toBe(1);
    expect(componentForAdd.student.cardNumber).toEqual('a123');
    expect(componentForAdd.student.firstName).toEqual('Petar');
    expect(componentForAdd.student.lastName).toEqual('Petrovic');
    // should fetch student enrollments
    expect(studentService.getStudentEnrollments).toHaveBeenCalledWith(1); // student id is 1
    expect(componentForAdd.enrollments.length).toBe(2);
    expect(componentForAdd.enrollments[0].id).toEqual(1);
    expect(componentForAdd.enrollments[0].startDate).toEqual(Date.UTC(2016, 0, 1));
    expect(componentForAdd.enrollments[0].endDate).toEqual(Date.UTC(2017, 0, 1));       
    expect(componentForAdd.enrollments[0].student.id).toEqual(1);
    expect(componentForAdd.enrollments[0].student.cardNumber).toEqual('a123');
    expect(componentForAdd.enrollments[0].student.firstName).toEqual('Petar');
    expect(componentForAdd.enrollments[0].student.lastName).toEqual('Petrovic');
    expect(componentForAdd.enrollments[0].course.id).toEqual(7);
    expect(componentForAdd.enrollments[0].course.name).toEqual('Matematika');

    expect(componentForAdd.enrollments[1].id).toEqual(2);
    expect(componentForAdd.enrollments[1].startDate).toEqual(Date.UTC(2015, 0, 1));
    expect(componentForAdd.enrollments[1].endDate).toEqual(Date.UTC(2016, 0, 1));       
    expect(componentForAdd.enrollments[1].student.id).toEqual(1);
    expect(componentForAdd.enrollments[1].student.cardNumber).toEqual('a123');
    expect(componentForAdd.enrollments[1].student.firstName).toEqual('Petar');
    expect(componentForAdd.enrollments[1].student.lastName).toEqual('Petrovic');
    expect(componentForAdd.enrollments[1].course.id).toEqual(8);
    expect(componentForAdd.enrollments[1].course.name).toEqual('Programiranje');

    //should display fetched student
    fixture.detectChanges(); // tell angular that data are fetched
    tick(); // initiate next cycle of binding these data to HTML components
    fixture.detectChanges(); // detect changes in the HTML components
    // assert that values in the HTML components are as expected
    let cardNumberInput = fixture.debugElement.query(By.css('#field1c')).nativeElement;
    expect(cardNumberInput.value).toEqual('a123');
    let firstNameInput = fixture.debugElement.query(By.css('#field2c')).nativeElement;
    expect(firstNameInput.value).toEqual('Petar');
    let lastNameInput = fixture.debugElement.query(By.css('#field3c')).nativeElement;
    expect(lastNameInput.value).toEqual('Petrovic');

    // should display student enrollments
    let enrollmentElements: DebugElement[] = fixture.debugElement.queryAll(By.css('table tr'));
    expect(enrollmentElements.length).toBe(2); // /two enrollmens are fetched
    // check displayed course names
    let courseNames: DebugElement[] = fixture.debugElement.queryAll(By.css('table tr td'));
    expect(courseNames.length).toBe(2); // /two enrollmens are fetched
    expect(courseNames[0].nativeElement.textContent).toContain('Matematika');
    expect(courseNames[1].nativeElement.textContent).toContain('Programiranje');
  }));


  // a helper function to tell Angular that an event on the HTML page has happened
  function newEvent(eventName: string, bubbles = false, cancelable = false) {
    let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

  it('should bind data from edit fields to student', fakeAsync(() => {
      fixture.detectChanges();  // ngOnInit will be called
      tick();
      // initially, we don't have needed data in the student object
      expect(componentForAdd.student.cardNumber).not.toEqual('a345');
      expect(componentForAdd.student.firstName).not.toEqual('Petar1');
      expect(componentForAdd.student.lastName).not.toEqual('Petrovic1');

      // insert data into input fields
      let cardNumberInput = fixture.debugElement.query(By.css('#field1c')).nativeElement;
      cardNumberInput.value = 'a345';
      let firstNameInput = fixture.debugElement.query(By.css('#field2c')).nativeElement;
      firstNameInput.value = 'Petar1';
      let lastNameInput = fixture.debugElement.query(By.css('#field3c')).nativeElement;
      lastNameInput.value  = 'Petrovic1';

      // bind data from HTML components to the student object
      cardNumberInput.dispatchEvent(newEvent('input')); 
      firstNameInput.dispatchEvent(newEvent('input')); 
      lastNameInput.dispatchEvent(newEvent('input')); 

      // expect that data from HTML components are copied into the student object
      expect(componentForAdd.student.cardNumber).toEqual('a345');
      expect(componentForAdd.student.firstName).toEqual('Petar1');
      expect(componentForAdd.student.lastName).toEqual('Petrovic1');
  }));

  it('should add student', fakeAsync(() => {
    // we do not initialize component, so the route param will be ignored and we will enter the ADD mode

    componentForAdd.save();
    expect(studentService.addStudent).toHaveBeenCalled();
    tick();
    // it should announce the change
    expect(studentService.announceChange).toHaveBeenCalled();
    // it should go to the previous page
    expect(location.back).toHaveBeenCalled();
  }));

  it('should edit student', fakeAsync(() => {
    componentForAdd.ngOnInit(); // when we call ngOnInit, route param will cause entering the EDIT mode
    componentForAdd.save();
    expect(studentService.editStudent).toHaveBeenCalled();
    tick();
    // it should announce the change
    expect(studentService.announceChange).toHaveBeenCalled();
    // it should go to the previous page
    expect(location.back).toHaveBeenCalled();
  }));

  it('should go back on goBack()', () => {
    componentForAdd.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});