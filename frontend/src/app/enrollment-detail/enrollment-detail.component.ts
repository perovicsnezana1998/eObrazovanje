import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Enrollment } from '../model/enrollment.model';
import { Student } from '../model/student.model';
import { Course } from '../model/course.model';

import { CourseService } from '../courses/course.service';
import { StudentService } from "app/students/student.service";
import { EnrollmentService } from "app/enrollments/enrollment.service";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-enrollment-detail',
  templateUrl: './enrollment-detail.component.html',
  styleUrls: ['./enrollment-detail.component.css']
})
export class EnrollmentDetailComponent implements OnInit {

  enrollment: Enrollment;
  students: Student[];

  // for date picker values
  ngbStartDate: NgbDateStruct;
  ngbEndDate: NgbDateStruct;

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private studentService: StudentService, private enrollmentService: EnrollmentService,
    private location: Location) {
    this.enrollment = new Enrollment({
      startDate: null,
      endDate: null,
      student: new Student({
        cardNumber: '',
        firstName: '',
        lastName: ''
      }),
      course: new Course({
        name: ''
      })
    });

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>
      this.courseService.getCourse(params['courseId'])
        .then(course => 
          this.enrollment.course = course 
        ));

    this.studentService.getStudents().then(students =>
      this.students = students);
  }

  private add(): void {
    // convert NgbDateStruct dates to Date objects
    this.enrollment.startDate = new Date(this.ngbStartDate.year, this.ngbStartDate.month-1, this.ngbStartDate.day);
    this.enrollment.endDate = new Date(this.ngbEndDate.year, this.ngbEndDate.month-1, this.ngbEndDate.day);

    this.enrollmentService.addEnrollment(this.enrollment)
      .then(enrollment => {
        this.enrollmentService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

}
