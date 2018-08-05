package com.dashboard.person;

import org.neo4j.ogm.annotation.*;

import java.util.Date;

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

    @Property
    private Date created;

    @Property
    private Date updated;

    @Property
    private String updatedBy;

    @Property
    private boolean admin;

    @Relationship(type = "REPORTS_TO", direction = Relationship.OUTGOING)
    private Person manager;

    private Person() {
        // Empty constructor required as of Neo4j API 2.0.5
    }

    public Person(String username, String firstName, String lastName, Date created, Date updated, String updatedBy, Person manager) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.created = created;
        this.updated = updated;
        this.updatedBy = updatedBy;
        this.manager = manager;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public boolean isAdmin() {
        return admin;
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