import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'


const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',

  })
}

@Injectable({
  providedIn: 'root'
})

export class PersonalReportDataService {
  // private apiUrl = 'http://localhost:8000'

  // constructor(private http: HttpClient) { }

  // getPersonalReportFromCSV(): Observable<any> {
  //   return this.http.get(this.apiUrl)
  // }

  private apiUrl = 'http://localhost:3000/learner'

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
  }

}
