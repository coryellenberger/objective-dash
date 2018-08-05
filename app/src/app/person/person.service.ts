import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Person} from "./person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) {}

  create(person: Person, manager: Person) {
    person.manager = manager;
    return this.http.post<Person>('/person', person);
  }

  get(username: string) {
    return this.http.get<Person>('/person/' + username);
  }

  delete(id: number) {
    return this.http.delete('/person/' + id);
  }
}
