/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FooterComponent } from './footer/footer.component';
import { MonthComponent } from './calendar/month/month.component';
import { MonthSelectorComponent } from './calendar/month/month-selector.component';
import { MonthDisplayComponent } from './calendar/month/month-display.component';
import { DayDisplayComponent } from './calendar/sideouts/day-display.component';
import { AppointmentDisplayComponent } from './calendar/sideouts/appointment-display.component';
import { AppointmentEditComponent } from './calendar/sideouts/appointment-edit.component';
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
        DayDisplayComponent,
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

  /*
  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
  */
});
