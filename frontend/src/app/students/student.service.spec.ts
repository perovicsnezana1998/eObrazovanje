import { TestBed } from '@angular/core/testing';
import {StudentService} from './student.service';
import { Student } from '../model/student.model';
import { Enrollment} from '../model/enrollment.model';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions, RequestMethod} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {async, fakeAsync, tick} from '@angular/core/testing';

describe('StudentService', () => {

	beforeEach(() => {

    TestBed.configureTestingModule({
       providers:    [ 
          {provide: ConnectionBackend, useClass: MockBackend},
          {provide: RequestOptions, useClass: BaseRequestOptions},
          Http,
          StudentService ]
    });

    this.studentService = TestBed.get(StudentService);
    this.backend = TestBed.get(ConnectionBackend);
    this.backend.connections.subscribe((connection: any) => 
       this.lastConnection = connection);
	});
 	
 	it('should pass simple test', () => {
	    expect(true).toBe(true);
	});

	it('getStudents() should query current service url', () => {
    this.studentService.getStudents();
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/students$/, 'url invalid');
	}); 

	it('getStudents() should return some students', fakeAsync(() => {
     let students: Student[];
     this.studentService.getStudents().then((data: Student[]) => students = data);
     this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify([
       	{
          id: 1,
          cardNumber: 'a123',
          firstName: 'Petar',
          lastName: 'Petrovic'            
       	},
        {
          id: 2,
          cardNumber: 'b456',
          firstName: 'Marko',
          lastName: 'Markovic'            
        }])
     })));
     tick();
     expect(students.length).toEqual(2, 'should contain given amount of students');
     expect(students[0].id).toEqual(1);
     expect(students[0].cardNumber).toEqual('a123');
     expect(students[0].firstName).toEqual('Petar');
     expect(students[0].lastName).toEqual('Petrovic');

     expect(students[1].id).toEqual(2);
     expect(students[1].cardNumber).toEqual('b456');
     expect(students[1].firstName).toEqual('Marko');
     expect(students[1].lastName).toEqual('Markovic');       
  }));

  it('getStudent() should query url and get a student', fakeAsync(() => {
    let student: Student;
    this.studentService.getStudent(1).then((s: Student) => student = s);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/students\/1$/, 'url invalid');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify(
        {
          id: 1,
          cardNumber: 'a123',
          firstName: 'Petar',
          lastName: 'Petrovic'            
        })
     })));
     tick();
     expect(student).toBeDefined();
     expect(student.id).toEqual(1);
     expect(student.cardNumber).toEqual('a123');
     expect(student.firstName).toEqual('Petar');
     expect(student.lastName).toEqual('Petrovic');

  })); 

  it('addStudent() should query url and save a student', fakeAsync(() => {
    let student: Student = new Student({  // a new student doesn't have an id
      cardNumber: 'a123',
      firstName: 'Petar',
      lastName: 'Petrovic' 
    });
    this.studentService.addStudent(student).then((s: Student) => student = s);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/students$/, 'url invalid');
    expect(this.lastConnection.request.method).toEqual(RequestMethod.Post, 'invalid http method');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify(
        {
          id: 1,
          cardNumber: 'a123',
          firstName: 'Petar',
          lastName: 'Petrovic'            
        })
     })));
     tick();
     expect(student).toBeDefined();
     expect(student.id).toEqual(1);
     expect(student.cardNumber).toEqual('a123');
     expect(student.firstName).toEqual('Petar');
     expect(student.lastName).toEqual('Petrovic');
  }));

  it('editStudent() should query url and edit a student', fakeAsync(() => {
    let student: Student = new Student({  
      id: 1,
      cardNumber: 'a123',
      firstName: 'Petar',
      lastName: 'Petrovic' 
    });
    this.studentService.editStudent(student).then((s: Student) => student = s);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/students$/, 'url invalid');
    expect(this.lastConnection.request.method).toEqual(RequestMethod.Put, 'invalid http method');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
       body: JSON.stringify(
        {
          id: 1,
          cardNumber: 'a123',
          firstName: 'Petar',
          lastName: 'Petrovic'            
        })
     })));
     tick();
     expect(student).toBeDefined();
     expect(student.id).toEqual(1);
     expect(student.cardNumber).toEqual('a123');
     expect(student.firstName).toEqual('Petar');
     expect(student.lastName).toEqual('Petrovic');
  }));

   it('deleteStudent() should query url and delete a student', () => {
    this.studentService.deleteStudent(1);
    
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/students\/1$/, 'url invalid');
    expect(this.lastConnection.request.method).toEqual(RequestMethod.Delete, 'invalid http method');
  });

  it('getStudentEnrollments() should query url and get enrollments', fakeAsync(() => {
    let enrollments: Enrollment[];

    this.studentService.getStudentEnrollments(1).then((data: Enrollment[]) => enrollments = data);
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/students\/1\/courses$/, 'url invalid');

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify([
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
        }]),
     })));
     tick();
     expect(enrollments.length).toEqual(2, 'should contain given amount of enrollments');

     expect(enrollments[0].id).toEqual(1);
     expect(enrollments[0].startDate).toEqual(Date.UTC(2016, 0, 1));
     expect(enrollments[0].endDate).toEqual(Date.UTC(2017, 0, 1));       
     expect(enrollments[0].student.id).toEqual(1);
     expect(enrollments[0].student.cardNumber).toEqual('a123');
     expect(enrollments[0].student.firstName).toEqual('Petar');
     expect(enrollments[0].student.lastName).toEqual('Petrovic');
     expect(enrollments[0].course.id).toEqual(7);
     expect(enrollments[0].course.name).toEqual('Matematika');

     expect(enrollments[1].id).toEqual(2);
     expect(enrollments[1].startDate).toEqual(Date.UTC(2015, 0, 1));
     expect(enrollments[1].endDate).toEqual(Date.UTC(2016, 0, 1));       
     expect(enrollments[1].student.id).toEqual(1);
     expect(enrollments[1].student.cardNumber).toEqual('a123');
     expect(enrollments[1].student.firstName).toEqual('Petar');
     expect(enrollments[1].student.lastName).toEqual('Petrovic');
     expect(enrollments[1].course.id).toEqual(8);
     expect(enrollments[1].course.name).toEqual('Programiranje');
  })); 


  it('announceChange() should emit the event RegenerateData', fakeAsync(() => {
    let counter: number = 0;
    this.studentService.RegenerateData$.subscribe(() =>  counter++
    );

    this.studentService.announceChange();
    tick();
    this.studentService.announceChange();
    tick();

    expect(counter).toBe(2);
  }));

  it ('handleError() should log error and reject a promise', fakeAsync(() => {
    spyOn(this.studentService, 'handleError').and.callThrough();
    spyOn(console, 'error'); // just spy on it without calling
    let rejected: boolean = false;

    this.studentService.handleError(new Error('ERROR')).then(null, () => {
      rejected = true;
    });

    expect(console.error).toHaveBeenCalled();

    tick();
    expect(rejected).toBe(true);
  })); 

  it('should call handleError if getStudents produces an error', fakeAsync(() => {     
    spyOn(this.studentService, 'handleError');
    
    this.studentService.getStudents();
    
    this.lastConnection.mockError(new Error());

    tick();

    expect(this.studentService.handleError).toHaveBeenCalled();
  }));


  /*
   * A more general solution for testing error handlers for all methods uniformly
   */   

  it('should call handleError if any method with HTTP call produce an error', () => {

    // this function checks multiple methods
    let testServiceMethodsForErrors = function(methods: Array<Function>): void  {

      // this function checks a single method
      let checkIsErrorHandlerCalled = function(method: Function): void {
        spyOn(this.studentService, 'handleError');            
        method.apply(this.studentService); // call the method on the this.studentService object         
        this.lastConnection.mockError(new Error());
        tick();
        // if an error occurs, we expect that handleError has been called
        expect(this.studentService.handleError).toHaveBeenCalled();
      };

      for (let method of methods) {
        fakeAsync((method: Function) => {
          checkIsErrorHandlerCalled(method);
        });
      }     
    };

    // test error handler for multiple methods organized in an array
    testServiceMethodsForErrors([this.studentService.getStudents, this.studentService.getStudent,
      this.studentService.addStudent, this.studentService.editStudent, this.studentService.deleteStudent,
      this.studentService.getStudentEnrollments]);
  });
});