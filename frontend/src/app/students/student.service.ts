import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Student } from '../model/student.model';
import { Enrollment } from '../model/enrollment.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class StudentService {
    private studentsUrl = 'api/students';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    private RegenerateData = new Subject<void>();

    RegenerateData$ = this.RegenerateData.asObservable();

    announceChange() {
        this.RegenerateData.next();
    }

    getStudents(): Promise<Student[]> {
        return this.http.get(this.studentsUrl)
            .toPromise()
            .then(response =>
                response.json() as Student[])
            .catch(this.handleError);
    }

    getStudent(id: number): Promise<Student> {
        const url = `${this.studentsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Student)
            .catch(this.handleError);
    }

    addStudent(student: Student): Promise<Student> {
        return this.http
            .post(this.studentsUrl, JSON.stringify(student), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Student)
            .catch(this.handleError);
    }

    editStudent(student: Student): Promise<Student> {
        return this.http
            .put(this.studentsUrl, JSON.stringify(student), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Student)
            .catch(this.handleError);
    }

    deleteStudent(studentId: number): Promise<{}> {
        const url = `${this.studentsUrl}/${studentId}`;
        return this.http
            .delete(url)
            .toPromise()
            .catch(this.handleError);
    }

    getStudentEnrollments(studentId: number): Promise<Enrollment[]> {
        const url = `${this.studentsUrl}/${studentId}/courses`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Enrollment[])
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        console.error("Error... ", error);
        return Promise.reject(error.message || error);
    }
}