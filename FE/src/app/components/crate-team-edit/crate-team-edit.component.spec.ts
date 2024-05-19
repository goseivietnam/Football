import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateTeamEditComponent } from './crate-team-edit.component';

describe('CrateTeamEditComponent', () => {
  let component: CrateTeamEditComponent;
  let fixture: ComponentFixture<CrateTeamEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrateTeamEditComponent]
    });
    fixture = TestBed.createComponent(CrateTeamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
