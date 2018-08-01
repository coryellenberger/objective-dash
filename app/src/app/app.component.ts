import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DemoService} from "./demo.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';

  public example;

  public isAuthenticated = false;

  constructor(private _demoService: DemoService) { }

  ngOnInit() {
    this.getDemo();
  }

  onClickMe() {
    this._demoService.authDemo().subscribe(
      data => {
        this.isAuthenticated = true
      },
      err => console.error(err),
      () => console.log('done loading Demo')
    );
  }

  getDemo() {
    this._demoService.registerUserDemo().subscribe(
      err => console.error(err),
      () => console.log('Registered Successfully')
    );
  }
}
