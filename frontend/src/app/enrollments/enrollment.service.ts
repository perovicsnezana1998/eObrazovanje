import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

import { Enrollment } from '../model/enrollment.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EnrollmentService {
    private enrollmentsUrl = 'api/enrollment';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    private RegenerateData = new Subject<void>();

    RegenerateData$ = this.RegenerateData.asObservable();

    announceChange() {
        this.RegenerateData.next();
    }

    
    addEnrollment(enrollment: Enrollment): Promise<Enrollment> {
        return this.http
            .post(this.enrollmentsUrl, JSON.stringify(enrollment), { headers: this.headers })
            .toPromise()
            .then(res => res.json() as Enrollment)
            .catch(this.handleError);
    }

    deleteEnrollment(enrollmentId: number): Promise<{}> {
        const url = `${this.enrollmentsUrl}/${enrollmentId}`;
        return this.http
            .delete(url)
            .toPromise()           
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        console.error("Error... ", error);
        return Promise.reject(error.message || error);
    }
}