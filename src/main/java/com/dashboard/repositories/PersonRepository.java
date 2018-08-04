package com.dashboard.repositories;

import com.dashboard.domain.Person;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {

    // derived finder
    Person findByUsername(String username);

}
