/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MonthSelectorComponent } from './month-selector.component';
import { routing } from '../../app.routing';

describe('Component: MonthSelector', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MonthSelectorComponent
      ],
      imports: [
        routing
      ]
    });
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(MonthSelectorComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
