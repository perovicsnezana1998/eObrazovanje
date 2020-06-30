import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { Student } from '../model/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'students-list',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[];

  subscription: Subscription;

  constructor(private studentService: StudentService, private router: Router) {
    this.subscription = studentService.RegenerateData$.subscribe(() =>
      this.getStudents()
    );
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().then(students =>
      this.students = students);
  }

  gotoAdd(): void {
    this.router.navigate(['/addStudent']);
  }

  gotoEdit(student: Student): void {
    this.router.navigate(['/editStudent', student.id]);
  }

  deleteStudent(studentId: number): void {
    this.studentService.deleteStudent(studentId).then(
      () => this.getStudents()
    );
  }
}
