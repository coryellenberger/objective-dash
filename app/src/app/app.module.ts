import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { fakeBackendProvider } from './fakebackend.interceptor';

import { DemoService } from './demo.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    DemoService,
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
