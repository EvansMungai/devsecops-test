import { Injectable, inject } from '@angular/core';
import { RoomData } from '../interfaces/roomData';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  constructor() { }

  getRoomsData(): Observable<RoomData[]> {
    return this.http.get<RoomData[]>(`${this.apiUrl}/rooms`);
  }
  createRoom(data: RoomData): Observable<RoomData>{
    return this.http.post<RoomData>(`${this.apiUrl}/room`, data);
  }
}
