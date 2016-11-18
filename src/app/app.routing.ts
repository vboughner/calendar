import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';

/*
 * Top-level routes for URLs in the application.
 */
const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
  { path: 'calendar', component: CalendarComponent },
  { path: 'calendar/:year/:month', component: CalendarComponent },
  { path: 'calendar/:year/:month/:appointment', component: CalendarComponent },
  { path: 'calendar/:year/:month/:appointment/:edit', component: CalendarComponent },
  { path: '**', redirectTo: 'calendar' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
