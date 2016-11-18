/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FooterComponent } from './footer/footer.component';
import { MonthComponent } from './calendar/month/month.component';
import { MonthSelectorComponent } from './calendar/month/month-selector.component';
import { MonthDisplayComponent } from './calendar/month/month-display.component';
import { AppointmentDisplayComponent } from './calendar/appointment/appointment-display.component';
import { AppointmentEditComponent } from './calendar/appointment/appointment-edit.component';
import { routing } from './app.routing';

describe('App: Calendar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
        routing
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
