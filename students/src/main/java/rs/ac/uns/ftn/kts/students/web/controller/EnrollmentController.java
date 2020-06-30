package rs.ac.uns.ftn.kts.students.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.ac.uns.ftn.kts.students.model.Course;
import rs.ac.uns.ftn.kts.students.model.Enrollment;
import rs.ac.uns.ftn.kts.students.model.Student;
import rs.ac.uns.ftn.kts.students.service.CourseService;
import rs.ac.uns.ftn.kts.students.service.EnrollmentService;
import rs.ac.uns.ftn.kts.students.service.StudentService;
import rs.ac.uns.ftn.kts.students.web.dto.EnrollmentDTO;

@RestController
@RequestMapping(value="api/enrollment")
public class EnrollmentController {
	@Autowired
	EnrollmentService enrollmentService;
	
	@Autowired
	StudentService studentService;
	
	@Autowired
	CourseService courseService;
	
	@RequestMapping(method=RequestMethod.POST, consumes="application/json")
	public ResponseEntity<EnrollmentDTO> createEnrollment(
			@RequestBody EnrollmentDTO enrollmentDTO) {
		//a new enrollment must have student and course defined
		if (enrollmentDTO.getStudent() == null || enrollmentDTO.getCourse() == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}		
		Student student =  studentService.findOne(enrollmentDTO.getStudent().getId());
		Course course = courseService.findOne(enrollmentDTO.getCourse().getId());		
		if (student == null || course == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}		
		
		Enrollment enrollment = new Enrollment();
		enrollment.setStartDate(enrollmentDTO.getStartDate());
		enrollment.setEndDate(enrollmentDTO.getEndDate());
		enrollment.setStudent(student);
		enrollment.setCourse(course);
		
		enrollment = enrollmentService.save(enrollment);				
		return new ResponseEntity<>(new EnrollmentDTO(enrollment), HttpStatus.CREATED);	
	}
	
	@RequestMapping(method=RequestMethod.PUT, consumes="application/json")
	public ResponseEntity<EnrollmentDTO> updateEnrollment(
			@RequestBody EnrollmentDTO enrollmentDTO){
		//an enrollment must exist
		Enrollment enrollment = enrollmentService.findOne(enrollmentDTO.getId()); 
		if (enrollment == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		//we allow changing startDate and endDate for an enrollment only
		enrollment.setStartDate(enrollmentDTO.getStartDate());
		enrollment.setEndDate(enrollmentDTO.getEndDate());
	
		enrollment = enrollmentService.save(enrollment);
		return new ResponseEntity<>(new EnrollmentDTO(enrollment), HttpStatus.OK);	
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Void> deleteEnrollment(@PathVariable Long id){
		Enrollment enrollment = enrollmentService.findOne(id);
		if (enrollment != null){
			enrollmentService.remove(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} else {		
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
