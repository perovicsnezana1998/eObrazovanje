package rs.ac.uns.ftn.kts.students.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rs.ac.uns.ftn.kts.students.model.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

}
