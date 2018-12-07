import { EventType } from '../models/events.model';

export class EventsConstants {
  static readonly getIconByEventType = (type: EventType): string => {
    return {
      birthday: 'cake',
      holiday: 'event_note',
      other: 'assignment_turned_in',
    }[type];
  }
}
