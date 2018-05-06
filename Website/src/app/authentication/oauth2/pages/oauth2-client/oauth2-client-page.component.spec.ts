import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Oauth2ClientPageComponent } from './oauth2-client-page.component';


describe('Oauth2ClientPageComponent', () => {
  let component: Oauth2ClientPageComponent;
  let fixture: ComponentFixture<Oauth2ClientPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Oauth2ClientPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Oauth2ClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
