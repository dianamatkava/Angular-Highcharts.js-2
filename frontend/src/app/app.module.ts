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
import { ReportFromJavaComponent } from './components/report-from-java/report-from-java.component';
import { NewJavaComponent } from './components/new-java/new-java.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';



const appRoutes: Routes = [
  {path: "pdf", component: PdfComponent},
  {path: "cohort-rep", component: PersonalReportComponent},
  {path: "java-app", component: ReportFromJavaComponent},
  {path: "new-java-app", component: NewJavaComponent},
  {path: "other", component: ChartsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    PersonalReportComponent,
    PdfComponent,
    ReportFromJavaComponent,
    NewJavaComponent,
  ],

  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [{
    provide: HIGHCHARTS_MODULES,
    useFactory: ChartModule
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
