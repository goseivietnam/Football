import { Component } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Product';
import { ProductsService } from 'src/app/services/products/products.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trash-can-post',
  templateUrl: './trash-can-post.component.html',
  styleUrls: ['./trash-can-post.component.scss'],
})
export class TrashCanPostComponent {
  theadTable: string[] = [
    'STT',
    'Tên sản phẩm',
    'Danh mục',
    'Trạng thái',
    'Xét duyệt',
    'Thao tác',
  ];
  posts: IPosts[] = [];
  constructor(
    private postsService: ProductsService,
    private toastr: ToastrService
  ) {
    this.getAllPostDeleted();
  }
  getAllPostDeleted() {
    this.postsService.getPostDeleted().subscribe((postsData) => {
      this.posts = postsData.posts.docs;
    });
  }
  undoDeletePost(id: string) {
    this.postsService.undoDeletePost(id).subscribe(() => {
      this.getAllPostDeleted();
      this.toastr.success('Khôi phục bài đăng thành công');
    });
  }
  deletePost(id: string) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
          .then(() => {
            this.postsService.deletePost(id).subscribe(() => {
              this.getAllPostDeleted();
              this.toastr.success('Xóa bài đăng thành công');
            });
          })
          .catch(() => {
            this.toastr.error('Xóa bài đăng thất bại');
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }
}
