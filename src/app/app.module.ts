import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDatepickerModule, MatDialogModule,
  MatExpansionModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { MenuComponent } from './menu/menu.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpDataService } from './services/http.data.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { EventsEffects } from './effects/events.effects';
import { PaginationComponent } from './pagination/pagination.component';
import { LoadEffects } from './effects/load.effects';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    MenuComponent,
    ModalComponent,
    PaginationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([EventsEffects, LoadEffects]),
  ],
  entryComponents: [ModalComponent],
  providers: [
    HttpDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
