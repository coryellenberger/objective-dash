# Objective Dashboard

## Setup Required

[Java JDK 8 and Maven 3](https://www.mkyong.com/maven/how-to-install-maven-in-windows/)

Neo4j

NodeJS (NPM included)

Git

IntelliJ/VS Code

## Initial Local Setup

First you must setup the front end application

$cd app

$npm install

$ng build

This will Compile the front end application at the src/main/java/resources/static directory to be used by the server

## Development server

Create Run Configuration using com.dashboard.Application as the Main Class

Run or Debug this Run Configuration

Visit localhost:8080

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
