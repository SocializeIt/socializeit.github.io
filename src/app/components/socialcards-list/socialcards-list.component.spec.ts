import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialcardsListComponent } from './socialcards-list.component';

describe('SocialcardsListComponent', () => {
  let component: SocialcardsListComponent;
  let fixture: ComponentFixture<SocialcardsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialcardsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialcardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
