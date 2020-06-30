package rs.ac.uns.ftn.kts.students.web.dto;

import rs.ac.uns.ftn.kts.students.model.Student;

public class StudentDTO {
	private Long id;
	String cardNumber;
	private String firstName;
	private String lastName;
	
	public StudentDTO() {
		
	}

	public StudentDTO(Student student) {
		this(student.getId(), student.getCardNumber(), student.getFirstName(),
				student.getLastName());
	}

	public StudentDTO(Long id, String cardNumber, String firstName,
			String lastName) {
		this.id = id;
		this.cardNumber = cardNumber;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public Long getId() {
		return id;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}
}
