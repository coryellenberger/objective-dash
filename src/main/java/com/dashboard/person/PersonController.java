package com.dashboard.person;

import com.dashboard.repositories.PersonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Cory Ellenberger on 7/30/2018.
 */
@RequestMapping("person")
@RestController
public class PersonController {

    PersonRepository personRepository;

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    ResponseEntity create(@RequestBody Person person) {
        personRepository.save(person);
        return new ResponseEntity<>(person, HttpStatus.OK);
    }

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE,
            value = "/{username}"
    )
    ResponseEntity get(@PathVariable("username") String username) {
        return new ResponseEntity<>(personRepository.findByUsername(username), HttpStatus.OK);
    }

    @RequestMapping(
            method = RequestMethod.DELETE
    )
    void delete(@RequestParam long personId) {
        personRepository.removePerson(personId);
    }
}
