import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/events.model';
import { EventResponse } from '../models/http.model';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpDataService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<ReadonlyArray<Event>> {
    return <Observable<ReadonlyArray<Event>>>this.http.get(environment.host + 'events/');
  }

  addEvent(event: Event): Observable<Event> {
    return <Observable<Event>>this.http.post(environment.host + 'events/', event);
  }

  updateEvent(event: Event): Observable<EventResponse> {
    return <Observable<EventResponse>>this.http.put(environment.host + 'events/', event);
  }

  deleteEvent(event: Event): Observable<EventResponse> {
    return <Observable<EventResponse>>this.http.delete(environment.host + `events/${event._id}`);
  }

  uploadFile(file: string): Observable<ReadonlyArray<Event>> {
    return <Observable<ReadonlyArray<Event>>>this.http.post(environment.host + 'events/upload', JSON.parse(file));
  }
}
