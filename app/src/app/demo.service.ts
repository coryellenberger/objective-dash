import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DemoService {

  constructor(private http: HttpClient) {
  }

  // Uses http.get() to load data from a single API endpoint
  getDemo() {
    return this.http.get('/api/example');
  }

  authDemo() {
    return this.http.post('/users/authenticate', {username: 'ABC123', password: '1111'});
  }

  registerUserDemo() {
    return this.http.post('/users/register', {username: 'ABC123', password: '1111', firstName: 'Abc', lastName: '123'})
  }
}
