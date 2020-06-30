import { Student } from './student.model';
import { Course } from './course.model';

export class Enrollment implements EnrollmentInterface{
	public id: number;
	public startDate: Date;
	public endDate: Date;	
	public student: Student;
    public course: Course;
		
	constructor(enrollmentCfg: EnrollmentInterface)
	{	
		this.id = enrollmentCfg.id;
        this.startDate = enrollmentCfg.startDate;
        this.endDate = enrollmentCfg.endDate;
        this.student = enrollmentCfg.student;
        this.course = enrollmentCfg.course;				
	}
}

interface EnrollmentInterface{
	id?: number;
	startDate: Date;
	endDate: Date;	
	student: Student;
    course: Course;
}