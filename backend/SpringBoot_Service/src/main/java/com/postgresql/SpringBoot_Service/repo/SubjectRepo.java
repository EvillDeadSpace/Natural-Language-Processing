package com.postgresql.SpringBoot_Service.repo;

import com.postgresql.SpringBoot_Service.model.Major;
import com.postgresql.SpringBoot_Service.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepo extends JpaRepository<Subject, Long> {
    List<Subject> findByMajor(Major major);
    List<Subject> findByMajorAndYear(Major major, Integer year);
    Optional<Subject> findByName(String name);
}
