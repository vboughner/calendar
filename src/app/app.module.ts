import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FooterComponent } from './footer/footer.component';
import { StorageService } from './data/storage.service';
import { MonthComponent } from './calendar/month/month.component';
import { MonthSelectorComponent } from './calendar/month/month-selector.component';
import { MonthDisplayComponent } from './calendar/month/month-display.component';
import { AppointmentDisplayComponent } from './calendar/appointment/appointment-display.component';
import { AppointmentEditComponent } from './calendar/appointment/appointment-edit.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalendarComponent,
    FooterComponent,
    MonthComponent,
    MonthSelectorComponent,
    MonthDisplayComponent,
    AppointmentDisplayComponent,
    AppointmentEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
