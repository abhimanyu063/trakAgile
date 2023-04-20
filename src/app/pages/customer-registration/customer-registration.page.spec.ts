import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerRegistrationPage } from './customer-registration.page';

describe('CustomerRegistrationPage', () => {
  let component: CustomerRegistrationPage;
  let fixture: ComponentFixture<CustomerRegistrationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomerRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
