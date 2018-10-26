import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AppComponent } from '../app.component';
import { ModalDialogData } from '../models/modal.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  eventName: string;
  eventType: string;
  eventDate: Date;
  eventDescription: string;

  constructor(public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalDialogData) { }

  ngOnInit() {
    if (this.data.event) {
      this.eventName = this.data.event.name;
      this.eventType = this.data.event.type;
      this.eventDate = this.data.event.date;
      this.eventDescription = this.data.event.description;
    }
  }

  saveEvent() {
    this.dialogRef.close({
      name: this.eventName,
      type: this.eventType,
      date: this.eventDate,
      description: this.eventDescription
    });
  }

}
