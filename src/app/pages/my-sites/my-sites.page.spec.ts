import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MySitesPage } from './my-sites.page';

describe('MySitesPage', () => {
  let component: MySitesPage;
  let fixture: ComponentFixture<MySitesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MySitesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
