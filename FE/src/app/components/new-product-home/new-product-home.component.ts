import { Component } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Product';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'pp-new-product-home',
  templateUrl: './new-product-home.component.html',
  styleUrls: ['../header/header.component.scss'],
})
export class NewProductHomePageComponent {
  /* config slider */
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    vertical: true,
    dots: false,
  };
  posts!: IPosts[];
  newPost!: IPosts;

  constructor(private postService: ProductsService) {
    this.postService.getPostsApporved('').subscribe((data) => {
      console.log(data, 'dât');
      this.posts = data.data;
      this.newPost = this.posts[0];
      // console.log(this.posts);
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
