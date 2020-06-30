import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';

import { CourseService } from '../courses/course.service';
import { EnrollmentService } from '../enrollments/enrollment.service';
import { Course } from '../model/course.model';
import { Enrollment } from '../model/enrollment.model';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course = new Course({ // if we add a new course, create an empty course
    name: '',
  });

  enrollments: Enrollment[];

  mode: string = 'ADD';

  constructor(private courseService: CourseService, private enrollmentService: EnrollmentService,
    private route: ActivatedRoute, private location: Location, private router: Router) {
    enrollmentService.RegenerateData$.subscribe(() =>
      this.getEnrollments()
    );
  }

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.mode = 'EDIT';
      // fetch course if we edit the existing course
      this.route.params
        .switchMap((params: Params) =>
          this.courseService.getCourse(+params['id']))
        .subscribe(course => {
          this.course = course;
          this.getEnrollments();
        });
    }
  }

  private getEnrollments(): void {
    this.courseService.getCourseEnrollments(this.course.id).then(enrollments =>
      this.enrollments = enrollments);
  }


  save(): void {
    this.mode == 'ADD' ? this.add() : this.edit();
  }

  private add(): void {
    this.courseService.addCourse(this.course)
      .then(course => {
        this.courseService.announceChange();
        this.goBack();
      });
  }

  private edit(): void {
    this.courseService.editCourse(this.course)
      .then(course => {
        this.courseService.announceChange();
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

  gotoAddEnrollment(): void {
    this.router.navigate(['/addEnrollment'], { queryParams: { courseId: this.course.id } });
  }

  deleteEnrollment(enrollmentId: number): void {
    this.enrollmentService.deleteEnrollment(enrollmentId).then(
      () => this.getEnrollments()
    );
  }

}
