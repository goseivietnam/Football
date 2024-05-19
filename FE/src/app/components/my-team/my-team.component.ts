import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import { ExcelServiceService } from 'src/app/services/excelService/excel-service.service';
import { TeamserviceService } from 'src/app/services/team/teamservice.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss'],
})
export class MyTeamComponent {
  title: string = 'Dánh sách các team đang cần thi đấu';
  routerLink: string = '/admin/add-category';
  theadTable: string[] = ['STT', 'Tên team', 'mô trả', 'Action'];
  team: any[] = [];
  myTeam: any = {};
  isDrawerOpen: boolean = false;
  idDt: string = '';
  constructor(
    private categoryService: CategoryService,
    private excelServiceService: ExcelServiceService,
    private TeamserviceService: TeamserviceService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.getAllTeamByMe();
    this.getAllTeamByUSer();
  }
  getAllTeamByUSer() {
    this.TeamserviceService.getAllTeamByUser().subscribe((team) => {
      console.log(team, 'team 1');
      this.team = team.data.items.filter(
        (items: any) => items.id !== this.myTeam.id
      );
    });
  }
  getAllTeamByMe() {
    this.TeamserviceService.getMyTeam().subscribe((team) => {
      console.log(team, 'team 2 ');
      this.myTeam = team.data;
    });
  }
  handleDeleteCategory(id: string) {
    if (window.confirm('Are you sure you want to delete'))
      this.TeamserviceService.deleteTeam(id).subscribe(() =>
        this.getAllTeamByUSer()
      );
  }
  inviteCreate(id: string) {
    // const id = this.route.snapshot.paramMap.get('id');
    this.idDt = id;
    this.isDrawerOpen = !this.isDrawerOpen;
    // const data: any = {
    //   teamId: this.myTeam.id,
    //   inviteTeamId: id,
    //   description: '',
    // };
    // this.TeamserviceService.createInvit(data).subscribe(() => {
    //   this.toastr.success('Add team successfully');
    // });
  }
  closeDrawer() {
    this.isDrawerOpen = false; // Đặt isDrawerOpen thành false để đóng drawer
  }
  handelUseTeam(idMyTeam: string) {
    const data: any = {
      teamId: idMyTeam,
      inviteTeamId: this.idDt,
      description: '',
    };
    this.TeamserviceService.createInvit(data).subscribe(() => {
      this.toastr.success('Add team successfully');
      this.closeDrawer();
    });
  }
}
