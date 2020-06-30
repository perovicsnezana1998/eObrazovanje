import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { StudentService } from '../students/student.service';
import { Student } from '../model/student.model';
import { Enrollment } from '../model/enrollment.model';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  student: Student;

  enrollments: Enrollment[];

  mode: string;    

  constructor(private studentService: StudentService, private route: ActivatedRoute, private location: Location) {
    this.student = new Student({ // if we add a new student, create an empty student
        cardNumber: '',
        firstName: '',
        lastName: ''
      });

    this.mode = 'ADD'
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.mode = 'EDIT'; 
      // fetch student if we edit the existing student
      this.route.params
        .switchMap((params: Params) => 
          this.studentService.getStudent(+params['id'])) // convert to number
        .subscribe(student => {
          this.student = student;
          this.studentService.getStudentEnrollments(student.id).then(enrollments =>
            this.enrollments = enrollments);
          }
        );
    } 
  }

  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();    
  }

  private add(): void {
    this.studentService.addStudent(this.student)
      .then(student => {
        this.studentService.announceChange();
        this.goBack();
      });
  }

  private edit(): void {
    this.studentService.editStudent(this.student)
      .then(student => {
        this.studentService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

}
