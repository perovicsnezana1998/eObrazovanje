package rs.ac.uns.ftn.kts.students.web.dto;

import java.util.Date;

import rs.ac.uns.ftn.kts.students.model.Enrollment;

public class EnrollmentDTO {
	private Long id;
	private Date startDate;
	private Date endDate;
	private StudentDTO student;
	private CourseDTO course;
	
	public EnrollmentDTO() {
		
	}
	
	public EnrollmentDTO(Enrollment enrollment) {
		id = enrollment.getId();
		startDate = enrollment.getStartDate();
		endDate = enrollment.getEndDate();
		student = new StudentDTO(enrollment.getStudent());
		course = new CourseDTO(enrollment.getCourse());
	}	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public StudentDTO getStudent() {
		return student;
	}
	public void setStudent(StudentDTO student) {
		this.student = student;
	}
	public CourseDTO getCourse() {
		return course;
	}
	public void setCourse(CourseDTO course) {
		this.course = course;
	}	
}
