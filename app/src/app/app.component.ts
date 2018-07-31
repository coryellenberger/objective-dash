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

  constructor(private _demoService: DemoService) { }

  ngOnInit() {
    this.getDemo();
  }

  getDemo() {
    this._demoService.getDemo().subscribe(
      data => {
        this.example = data
      },
      err => console.error(err),
      () => console.log('done loading Demo')
    );
  }
}
