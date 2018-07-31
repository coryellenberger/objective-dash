import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DemoService {

  constructor(private http:HttpClient) {}

  // Uses http.get() to load data from a single API endpoint
  getDemo() {
    return this.http.get('/api/example');
  }
}
