import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import { ExcelServiceService } from 'src/app/services/excelService/excel-service.service';
import { TeamserviceService } from 'src/app/services/team/teamservice.service';

@Component({
  selector: 'app-invitebyme',
  templateUrl: './invitebyme.component.html',
  styleUrls: ['./invitebyme.component.scss'],
})
export class InvitebymeComponent {
  title: string = 'Tất cả danh sách team đã từ chối';
  title2: string = '';

  routerLink: string = '/admin/add-category';
  theadTable: string[] = ['STT', 'Tên đội', 'số điện thoại', 'level', 'tuổi'];
  theadTable2: string[] = [
    'STT',
    'team mời',
    'level',
    'tuổi',
    'SĐT team mời',
    'team được mời',
    'action',
  ];

  team: any[] = [];
  user: any;
  myTeam: any = {};
  acceptValue: any = null;
  nextResult: any = '';
  newResult: any[] = [];
  inviteMe: any[] = [];
  check2 = false;
  constructor(
    private categoryService: CategoryService,
    private excelServiceService: ExcelServiceService,
    private TeamserviceService: TeamserviceService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getInviteByMe();
  }
  getInviteByMe() {
    this.acceptValue = this.route.snapshot.queryParamMap.get('accept');
    switch (this.acceptValue) {
      case '5':
        this.TeamserviceService.getInviAcceptMe().subscribe((team) => {
          var newResult = [];
          for (const v1 of team.data.items) {
            newResult.push({
              teamId: v1.team.id,
              name: v1.team.name,
              level: v1.team.level,
              age: v1.team.age,
              phone: v1.team.phone,
              myTeamId: v1.inviteTeam.id,
              nameMyTeam: v1.inviteTeam.name,
              levelMyTeam: v1.inviteTeam.level,
              phoneMyTeam: v1.inviteTeam.phone,
              ageMyteam: v1.inviteTeam.age,
            });
          }
          console.log(newResult, 'newResult');
          this.inviteMe = newResult;
          this.title2 ="Tất cả danh sách team đã đồng ý"
        });
        break;
      case '6':
        this.TeamserviceService.getRejectedMe().subscribe((team) => {
          var newResult = [];
          for (const v1 of team.data.items) {
            newResult.push({
              teamId: v1.team.id,
              name: v1.team.name,
              level: v1.team.level,
              age: v1.team.age,
              phone: v1.team.phone,
              myTeamId: v1.inviteTeam.id,
              nameMyTeam: v1.inviteTeam.name,
              levelMyTeam: v1.inviteTeam.level,
              phoneMyTeam: v1.inviteTeam.phone,
              ageMyteam: v1.inviteTeam.age,
            });
          }
          console.log(newResult, 'newResult');
          this.inviteMe = newResult;
          this.title2 ="Tất cả danh sách team đã từ chối"

        });
        break;
      default:
        this.TeamserviceService.getInviAcceptMe().subscribe((team) => {
          var newResult = [];
          for (const v1 of team.data.items) {
            newResult.push({
              teamId: v1.team.id,
              name: v1.team.name,
              level: v1.team.level,
              age: v1.team.age,
              phone: v1.team.phone,
              myTeamId: v1.inviteTeam.id,
              nameMyTeam: v1.inviteTeam.name,
              levelMyTeam: v1.inviteTeam.level,
              phoneMyTeam: v1.inviteTeam.phone,
              ageMyteam: v1.inviteTeam.age,
            });
          }
          console.log(newResult, 'newResult');
          this.inviteMe = newResult;
          this.title2 ="Tất cả danh sách team đã đồng ý"

        });
    }
  }
}
