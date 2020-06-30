import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Course } from '../model/course.model';
import { CourseService } from './course.service';

@Component({
  selector: 'courses-list',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[];

  subscription: Subscription;

  constructor(private courseService: CourseService, private router: Router) {
    this.subscription = courseService.RegenerateData$.subscribe(() =>
      this.getCourses()
    );
  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCourses().then(courses =>
      this.courses = courses);
  }

  gotoAdd(): void {
    this.router.navigate(['/addCourse']);
  }

  gotoEdit(course: Course): void {
    this.router.navigate(['/editCourse', course.id]);
  }

  deleteCourse(courseId: number): void {
    this.courseService.deleteCourse(courseId).then(
      () => this.getCourses()
    );
  }
}
