import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRequestPage } from './my-request.page';

describe('MyRequestPage', () => {
  let component: MyRequestPage;
  let fixture: ComponentFixture<MyRequestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
