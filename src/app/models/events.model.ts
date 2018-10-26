export interface Event {
  _id?: string;
  readonly name: string;
  readonly type: EventType;
  readonly description: string;
  readonly date: Date;
}

type EventType =
  'birthday' |
  'holiday';
