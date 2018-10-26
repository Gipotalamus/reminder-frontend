import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/events.model';

@Injectable()
export class HttpDataService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<ReadonlyArray<Event>> {
    return <Observable<ReadonlyArray<Event>>>this.http.get('http://localhost:1234/events/');
  }

  addEvent(event: Event): Observable<Object> {
    return this.http.post('http://localhost:1234/events/', event);
  }

  updateEvent(event: Event): Observable<Object> {
    return this.http.put('http://localhost:1234/events/', event);
  }

  deleteEvent(event: Event): Observable<Object> {
    return this.http.delete(`http://localhost:1234/events/${event._id}`);
  }

  uploadFiles(file: string): Observable<Object> {
    return this.http.post('http://localhost:1234/events/upload', JSON.parse(file));
  }
}
