package com.dashboard.repositories;

import com.dashboard.person.Person;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created by Cory Ellenberger on 8/2/2018.
 */
public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {

    // derived finder
    Person findByUsername(String username);

    @Query("MATCH (person:Person) " +
    "WHERE ID(person) = {personId} " +
    "DETACH DELETE person")
    void removePerson(@Param("personId") Long personId);

}
