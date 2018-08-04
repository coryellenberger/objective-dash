package com.dashboard.person;

import org.neo4j.ogm.annotation.*;

/**
 * Created by Cory Ellenberger on 8/4/2018.
 */
@NodeEntity
public class Person {

    @Id
    @GeneratedValue
    private Long id;

    @Property
    private String username;

    @Property
    private String firstName;

    @Property
    private String lastName;

    @Relationship(type = "REPORTS_TO", direction = Relationship.OUTGOING)
    private Person manager;

    private Person() {
        // Empty constructor required as of Neo4j API 2.0.5
    }

    public Person(String username, String firstName, String lastName, Person manager) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.manager = manager;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Person getManager() {
        return manager;
    }

    public void setManager(Person manager) {
        this.manager = manager;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }
}