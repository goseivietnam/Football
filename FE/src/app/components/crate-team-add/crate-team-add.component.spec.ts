import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateTeamAddComponent } from './crate-team-add.component';

describe('CrateTeamAddComponent', () => {
  let component: CrateTeamAddComponent;
  let fixture: ComponentFixture<CrateTeamAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrateTeamAddComponent]
    });
    fixture = TestBed.createComponent(CrateTeamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
