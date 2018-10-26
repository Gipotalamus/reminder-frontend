import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '../models/events.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  @Input()
  events: ReadonlyArray<Event>;

  @Output()
  deleteEvent: EventEmitter<Event> = new EventEmitter();

  @Output()
  editEvent: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDeleteEvent(event: Event): void {
    this.deleteEvent.emit(event);
  }

  onEditEvent(event: Event): void {
    this.editEvent.emit(event);
  }
}
