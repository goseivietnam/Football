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
  title: string = 'Danh sách các đội chủ nhà';
  routerLink: string = '/admin/add-category';
  theadTable: string[] = ['STT', 'Tên đội', 'Mô tả', 'Thao tác'];
  team: any[] = [];
  myTeam: any = {};
  isDrawerOpen: boolean = false;
  idDt: string = '';
  bookingId: string = '';
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
      const uniqueItems = [...new Map(team.data.items.map((item: any) =>
        [item['id'], item])).values()];
      this.team = uniqueItems.filter(
        (items: any) => items.id !== this.myTeam.id
      );
      console.log(this.team)
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
  inviteCreate(id: string, bookingId: string) {
    // const id = this.route.snapshot.paramMap.get('id');
    this.idDt = id;
    this.bookingId = bookingId;
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
      bookingId: this.bookingId,
    };
    this.TeamserviceService.createInvit(data).subscribe(() => {
      this.toastr.success('Add team successfully');
      this.closeDrawer();
    });
  }
}
