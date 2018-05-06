import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStartComponent } from './view-start.component';

describe('ViewStartComponent', () => {
  let component: ViewStartComponent;
  let fixture: ComponentFixture<ViewStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
