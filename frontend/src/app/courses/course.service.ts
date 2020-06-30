import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Course } from '../model/course.model';
import { Enrollment } from '../model/enrollment.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CourseService {
    private coursesUrl = 'api/courses';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    private RegenerateData = new Subject<void>();

    RegenerateData$ = this.RegenerateData.asObservable();

    announceChange() {
        this.RegenerateData.next();
    }

    getCourses(): Promise<Course[]> {
        return this.http.get(this.coursesUrl)
            .toPromise()
            .then(response =>
                response.json() as Course[])
            .catch(this.handleError);
    }

    getCourse(id: number): Promise<Course> {
        const url = `${this.coursesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response =>
                response.json() as Course)
            .catch(this.handleError);
    }

    addCourse(course: Course): Promise<Course> {
        return this.http
            .post(this.coursesUrl, JSON.stringify(course), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Course)
            .catch(this.handleError);
    }

    editCourse(course: Course): Promise<Course> {
        return this.http
            .put(this.coursesUrl, JSON.stringify(course), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Course)
            .catch(this.handleError);
    }

    deleteCourse(courseId: number): Promise<{}> {
        const url = `${this.coursesUrl}/${courseId}`;
        return this.http
            .delete(url)
            .toPromise()           
            .catch(this.handleError);
    }

    getCourseEnrollments(courseId: number): Promise<Enrollment[]> {
        const url = `${this.coursesUrl}/${courseId}/students`;
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