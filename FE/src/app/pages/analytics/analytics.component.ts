import { Component } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent {
  title: string = 'Sản phẩm đã bán';
  analyticsList: number = 0;
  orderList: any[] = [];

  theadTable: string[] = [
    'STT',
    'Tên',
    'Email',
    'Image',
    'Price',
    'Trạng thái',
  ];
  constructor(
    private AnalyticsService: AnalyticsService,
    private AllOrderDone: AnalyticsService
  ) {
    this.getTotalAnalyticsDone();
    this.getAllOrderDone();
  }
  getTotalAnalyticsDone() {
    this.AnalyticsService.getTotalAnalyticsDone().subscribe(
      (analyticsLists) => {
        console.log(analyticsLists, 'cc');
        this.analyticsList = analyticsLists.toLocaleString();
      }
    );
  }
  getAllOrderDone() {
    this.AllOrderDone.getAllOrderDone().subscribe((orderLista) => {
      console.log(orderLista, 'cc');
      this.orderList = orderLista;
    });
  }
}
