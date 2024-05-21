import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { ExcelServiceService } from 'src/app/services/excelService/excel-service.service';
import { TeamserviceService } from 'src/app/services/team/teamservice.service';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss'],
})
export class TeamCreateComponent {
  title: string = 'Quản lý team';
  routerLink: string = '/admin/add-category';
  theadTable: string[] = ['STT', 'Tên đội', 'Mô tả', 'Thao tác'];
  team: any[] = [];
  dataDetailsTeam: any;
  constructor(
    private categoryService: CategoryService,
    private excelServiceService: ExcelServiceService,
    private TeamserviceService: TeamserviceService
  ) {
    this.getAllTeamByUSer();
  }
  getAllTeamByUSer() {
    this.TeamserviceService.getMyTeam().subscribe((team) => {
      console.log(team, 'team');
      if (team.data) this.team = team.data;
    });
  }
  handleDeleteCategory(id: string) {
    if (window.confirm('Are you sure you want to delete'))
      this.TeamserviceService.deleteTeam(id).subscribe(() => {
        window.location.reload();
        this.getAllTeamByUSer();
      });
  }
  getIdTeam(id: any) {
    this.TeamserviceService.getIdTeam(id).subscribe((db: any) => {
      console.log(db, 'db');
      this.dataDetailsTeam = db.data;
    });
  }
  handelUseTeam(team: any) {}
}
