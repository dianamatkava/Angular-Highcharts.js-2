import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChartsComponent } from './components/charts/charts.component';
import { PersonalReportComponent } from './components/personal-report/personal-report.component';
import { PdfComponent } from './components/pdf/pdf.component';

const appRoutes: Routes = [
  {path: "pdf", component: PdfComponent},
  {path: "cohort-rep", component: PersonalReportComponent},
  {path: "other", component: ChartsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    PersonalReportComponent,
    PdfComponent,
  ],

  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
