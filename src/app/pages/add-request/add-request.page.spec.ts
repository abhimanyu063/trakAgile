import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRequestPage } from './add-request.page';

describe('AddRequestPage', () => {
  let component: AddRequestPage;
  let fixture: ComponentFixture<AddRequestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
