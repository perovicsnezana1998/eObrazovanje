import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { EnrollmentDetailComponent} from './enrollment-detail/enrollment-detail.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'addStudent', component: StudentDetailComponent },
  { path: 'editStudent/:id', component: StudentDetailComponent },
  { path: 'addCourse', component: CourseDetailComponent },
  { path: 'editCourse/:id', component: CourseDetailComponent },
  { path: 'addEnrollment', component: EnrollmentDetailComponent },
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
