import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ChartsComponent } from './components/charts/charts.component';
import { PersonalReportComponent } from './components/personal-report/personal-report.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    PersonalReportComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
