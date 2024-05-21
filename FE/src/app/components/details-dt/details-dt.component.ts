import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import { ExcelServiceService } from 'src/app/services/excelService/excel-service.service';
import { TeamserviceService } from 'src/app/services/team/teamservice.service';

@Component({
  selector: 'app-details-dt',
  templateUrl: './details-dt.component.html',
  styleUrls: ['./details-dt.component.scss']
})
export class DetailsDtComponent {
  title: string = 'Chi tiết';
  theadTable: string[] = ['STT', 'Tên đội', 'Mô tả', 'Level','SĐT','Tuổi', 'Tên sân', 'Địa chỉ sân', 'Thời gian thuê', 'Thao tác'];
  team: any[] = [];
  myTeam: any = {};

  constructor(
    private categoryService: CategoryService,
    private excelServiceService: ExcelServiceService,
    private TeamserviceService: TeamserviceService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ){
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.getTeamById(id!);
    });
  }
  getTeamById(id : string) {
    this.TeamserviceService.getIdTeam(id).subscribe((team) => {
      console.log(team, 'team 1');
      this.team = [team.data]
    });
  }
  inviteCreate(id : string)  {
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
}
