# Objective Dashboard

## Setup Required

[Git](https://git-scm.com/download/win "Git Webpage")

[Java JDK 8 and Maven 3](https://www.mkyong.com/maven/how-to-install-maven-in-windows/ "How to on: install and configure Java/Maven")

[Neo4j](https://neo4j.com/ "Neo4j Webpage")

[NodeJS](https://nodejs.org/en/ "NodeJS Webpage")

[IntelliJ/VS Code](https://www.jetbrains.com/idea/ "IntelliJ Webpage")

## Initial Local Setup

(All of the pre-requisitves above must be completed first)

Check out the source from git.

Import the Maven project and all the dependencies.

First time setup: configure the JDK with IntelliJ.

Run `cd app` to change to the app directory.

The source for the Angular 6 Application resides in the app directory

Run `npm install` to install the Angular/NodeJS dependencies required to run unit tests, ete tests, etc.

First time setup: Run `npm install -g @angular/cli` to install the Angular CLI tool globally for build/test/scaffolding of the front end app.

Run `ng build` to Build/Compile the front end application at the src/main/java/resources/static directory to be used by the server.

(Note: application.properties has configuration for the static directory that will force the files to be updated by the browser. Remove this property for caching purposes.)

## Development server

Create Run Configuration using com.dashboard.Application as the Main Class.

Run or Debug this Run Configuration.

Visit localhost:8080

(Note: with the application properties configuration above set you can change/re-compile the Angular app and see the changes when refreshing the browser; instead of having to reset the Spring Application)





## Running back end unit tests

You can do this within IntelliJ by right clicking on the src/test/java directory and selecting "Run 'All Tests'" or selecting a single Test class or method and executing it directly.

## Code scaffolding front end

(Confirm you are in the app directory)

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running front end unit tests

(Confirm you are in the app directory)

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

(Confirm you are in the app directory)

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
