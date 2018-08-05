import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DemoService} from "./demo.service";
import {PersonService} from "./person/person.service";
import {Person} from "./person/person";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';

  public user;

  constructor(private personService: PersonService) {
  }

  onClickMe() {
    let person = new Person();
    person.username = 'ABC';
    person.firstName = 'TEST';
    person.lastName = 'USER';
    person.admin = true;
    person.updatedBy = 'Cory_Ellenberger';
    this.personService.get('Tina_Cook').subscribe(
      manager => this.personService.create(person, manager).subscribe(
        person => this.user = person
      ),
      err => console.error(err),
      () => console.log('done creating test_user')
    );
  }

  onClickDelete(person: Person) {
    this.personService.delete(person.id).subscribe(
      () => console.log('done deleting test_user'),
      err => console.error(err)
    );
  }
}
