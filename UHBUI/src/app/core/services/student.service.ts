import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StudentData } from '../interfaces/studentData';
import { ApplicationData } from '../interfaces/applicationData';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  constructor() { }
  getStudentData(): Observable<StudentData[]> {
    return this.http.get<StudentData[]>(`${this.apiUrl}/students`);
  }
  getSpecificStudentData(registrationNo: string): Observable<StudentData> {
    const encodedRegNo = encodeURIComponent(registrationNo);
    return this.http.get<StudentData>(`${this.apiUrl}/student/${encodedRegNo}`);
  }
  getApplicationData(registrationNo: string): Observable<ApplicationData[]> {
    const encodedRegNo = encodeURIComponent(registrationNo);
    return this.http.get<ApplicationData>(`${this.apiUrl}/application/${encodedRegNo}`).pipe(map((data: ApplicationData) => [data]));
  }
  getAccommodationData(registrationNo: string): Observable<ApplicationData[]> {
    const encodedRegNo = encodeURIComponent(registrationNo);
    return this.http.get<ApplicationData>(`${this.apiUrl}/application/${encodedRegNo}`).pipe(map((data: ApplicationData) => [data]));
  }
  createStudentDetails(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/student`, data);
  }
}
