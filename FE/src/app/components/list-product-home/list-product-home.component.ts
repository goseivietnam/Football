import { Component } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Product';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-list-product-home',
  templateUrl: './list-product-home.component.html',
  styleUrls: ['./list-product-home.component.scss'],
})
export class PostsComponent {
  /* config slider */
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  posts: IPosts[] = [];
  constructor(private postService: ProductsService) {
    this.postService.getPostsApporved('').subscribe((data) => {
      console.log(data,'data')
      this.posts = data.data.items;
    });
  }
  handleFomatDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript tính từ 0 - 11, nên cần cộng 1
    const year = date.getFullYear();
    // Định dạng lại chuỗi ngày, tháng, năm
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}
