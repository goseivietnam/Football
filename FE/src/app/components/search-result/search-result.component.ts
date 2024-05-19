import { Component, Input } from '@angular/core';

import { IPosts } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  @Input() searchResult!: IPosts[];
  @Input() isShowSearch!: boolean;

  handleClick() {
    this.isShowSearch = false;
    // console.log(this.isShowSearch);
  }
  handleFomatDate(dateString: any) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript tính từ 0 - 11, nên cần cộng 1
    const year = date.getFullYear();
    // Định dạng lại chuỗi ngày, tháng, năm
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}
