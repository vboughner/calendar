/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MonthDisplayComponent } from './month-display.component';

describe('Component: MonthDisplay', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MonthDisplayComponent
      ],
    });
  });

  it('should create an instance', async(() => {
    let fixture = TestBed.createComponent(MonthDisplayComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
