import {ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core'
import {async, fakeAsync, tick} from '@angular/core/testing';

import { StudentsComponent } from './students.component';
import { StudentService } from './student.service';
import { Student } from '../model/student.model';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let studentService: any;
  let router: any;

  beforeEach(() => {
    let studentServiceMock = {
      getStudents: jasmine.createSpy('getStudents')
          .and.returnValue(Promise.resolve([{}, {}, {}])), 
      deleteStudent: jasmine.createSpy('deleteStudent')
        .and.returnValue(Promise.resolve()),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    let routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
       declarations: [ StudentsComponent ],
       providers:    [ {provide: StudentService, useValue: studentServiceMock },
                       { provide: Router, useValue: routerMock } ]
    });

    fixture = TestBed.createComponent(StudentsComponent);
    component    = fixture.componentInstance;
    studentService = TestBed.get(StudentService);
    router = TestBed.get(Router);
  });


  it('should fetch the students list on init', async(() => {
    component.ngOnInit();
    // should subscribe on RegenerateData
    expect(studentService.RegenerateData$.subscribe).toHaveBeenCalled();
    expect(studentService.getStudents).toHaveBeenCalled();

    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        expect(component.students.length).toBe(3); // mock studentService returned 3 empty objects
        let elements: DebugElement[] = fixture.debugElement.queryAll(By.css('table tr'));
        expect(elements.length).toBe(4); // header tr plus one tr for each student
      });
  }));

  it('should navigate to add page', () => {
    component.gotoAdd();
    expect(router.navigate).toHaveBeenCalledWith(
      ['/addStudent']);
  });

  it('should navigate to the edit page', () => {
    let student: Student = new Student({  
        id: 7,
        cardNumber: 'a123',
        firstName: 'Petar',
        lastName: 'Petrovic' 
      });
    component.gotoEdit(student);
    expect(router.navigate).toHaveBeenCalledWith(
      ['/editStudent', 7]);
  });

  it ('should call deleteStudent', () => {
    component.deleteStudent(1);

    expect(studentService.deleteStudent).toHaveBeenCalledWith(1);    
  }); 

});
