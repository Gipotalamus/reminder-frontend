import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output()
  addEvent: EventEmitter<void> = new EventEmitter();

  @Output()
  uploadFile: EventEmitter<FileList> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onAddEvent(): void {
    this.addEvent.emit();
  }

  onFileUpload(file: File): void {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.uploadFile.emit(fileReader.result);
    }
    fileReader.readAsText(file);
  }
}
