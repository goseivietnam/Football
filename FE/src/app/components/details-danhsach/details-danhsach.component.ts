import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import { ExcelServiceService } from 'src/app/services/excelService/excel-service.service';
import { TeamserviceService } from 'src/app/services/team/teamservice.service';

@Component({
  selector: 'app-details-danhsach',
  templateUrl: './details-danhsach.component.html',
  styleUrls: ['./details-danhsach.component.scss'],
})
export class DetailsDanhsachComponent {
  title: string = 'Tất cả danh sách mời';
  title2: string = 'Tất cả bạn đã mời';
  checkShowHide: boolean = false;
  routerLink: string = '/admin/add-category';
  theadTable: string[] = ['STT', 'Tên team', 'Số điện thoại', 'Level', 'Tuổi', 'Tên sân', 'Địa chỉ sân', 'Thời gian thuê'];
  theadTable2: string[] = [
    'STT',
    'Team mời',
    'Level',
    'Tuổi',
    'SĐT team mời',
    'Team được mời',
    'Tên sân',
    'Địa chỉ sân',
    'Thời gian thuê',
    'Action',
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
    this.getAllTeamByUSer();
    this.getAllTeamByMe();
    this.getInviteByMe();
  }
  getAllTeamByUSer() {
    this.acceptValue = this.route.snapshot.queryParamMap.get('accept');
    switch (this.acceptValue) {
      case '1':
        this.nextResult = { all: true, userId: this.user.id };
        break;
      case 'true':
        this.nextResult = { accept: true, userId: this.user.id };
        break;
      case 'false':
        this.nextResult = { accept: false, userId: this.user.id };
        break;
      case '2':
        this.check2 = true;
        break;
      default:
        this.nextResult = { all: true, userId: this.user.id };
    }
    this.TeamserviceService.getDataInviteByUser(this.nextResult).subscribe(
      (team) => {
        console.log(team.data.items.inviteTeam, 'team');
        console.log(team.data.items, 'inv');
        this.team = team.data.items;
        var newData = Object.entries(this.team);
        var nextResult = [];
        for (const [key, value] of newData) {
          console.log(key, '1');
          console.log(value, '2');
          this.checkShowHide =
            value.inviteTeam.userId == this.user.id ? true : false;
          nextResult.push({
            id: value.id,
            nameTeam: value.team.name,
            age: value.team.age,
            level: value.team.level,
            phone: value.team.phone,
            fieldName: value.team.fieldName,
            fieldAddress: value.team.fieldAddress,
            fieldCreatedDate: value.team.fieldCreatedDate,
            accepted: value.accepted,
          });
        }
        this.newResult = nextResult;

        console.log(this.newResult);
      }
    );
  }
  getAllTeamByMe() {
    this.TeamserviceService.getMyTeam().subscribe((team) => {
      console.log(team, 'team');

      this.myTeam = team.data;
    });
  }
  getInviteByMe() {
    this.TeamserviceService.getInvitWithMe().subscribe((team) => {
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
          fieldName: v1.team.fieldName,
          fieldAddress: v1.team.fieldAddress,
          fieldCreatedDate: v1.team.fieldCreatedDate
        });
      }
      console.log(newResult, 'newResult');
      this.inviteMe = newResult;
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
    const data: any = {
      teamId: this.myTeam.id,
      inviteTeamId: id,
      description: '',
    };
    this.TeamserviceService.createInvit(data).subscribe(() => {
      this.toastr.success('Add team successfully');
    });
  }
  actionOnInvite(id: string, action: any) {
    //actionOnInviteAPI
    var dataAcept = {
      id: id,
      accept: action == 1 ? true : false,
    };
    this.TeamserviceService.actionOnInviteAPI(dataAcept).subscribe(() => {
      // window.location.reload();
      this.getAllTeamByUSer();
    });
  }
}
