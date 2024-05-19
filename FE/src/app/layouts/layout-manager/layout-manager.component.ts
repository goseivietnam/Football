import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ICategory } from 'src/app/interfaces/Category';
import { ITag, ITagDocs } from 'src/app/interfaces/ITag';
import { IPosts } from 'src/app/interfaces/Product';
import { IUser } from 'src/app/interfaces/User';
import {
  IComment,
  IResCountComment,
  IResViewComment,
} from 'src/app/interfaces/comment';
import { ProductsService } from 'src/app/services/products/products.service';
import { environment } from 'src/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout-manager',
  templateUrl: './layout-manager.component.html',
  styleUrls: ['./layout-manager.component.scss'],
})
export class LayoutManagerComponent {
  urlImage: string = environment.API_URL + '/root/';
  infoUser: any;
  @Input() title: string = '';
  @Input() linkActive: string = '';
  @Input() titleModal: string = '';
  @Input() theadTable: string[] = [];
  @Input() dataTbody: IUser[] = [];
  @Input() categories: ICategory[] = [];
  @Input() tags: ITag[] = [];
  @Input() posts: any[] = [];
  @Input() comments: IResCountComment[] = [];
  @Input() viewComments: IResViewComment[] = [];
  @Input() handleAddNewUser: any;
  @Input() userForm: any;
  @Input() paginationObj: any;
  @Output() exportToExcel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<any>();
  @Output() gotoPage = new EventEmitter<number | string>();
  @Output() prevPage = new EventEmitter<boolean>();
  @Output() nextPage = new EventEmitter<boolean>();
  @Input() orderList: any[] = [];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  postInfo!: IPosts;
  constructor(
    private postsService: ProductsService,
    private toastr: ToastrService
  ) {
    console.log(this.posts);
    this.infoUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.infoUser);
  }

  /* handle edit */
  handleEdit(items: any) {
    this.edit.emit(items);
  }
  /* handle delete */
  handleDelete(id: string) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      customClass: {
        container: 'white-bg', // Thêm lớp CSS để định nghĩa màu nền trắng
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        ).then(() => {
          this.delete.emit(id);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }
  /* handle Thêm mới user */
  handleAdd(info: any) {
    this.handleAddNewUser.emit(info);
  }
  /* handle export excel */
  handleExportToExcel() {
    this.exportToExcel.emit();
  }

  /* get post by id */
  getPostById(id: string): void {
    console.log(id);
    if (!id) return;
    var checkDate = new Date();
    var currentDate: any = this.formatDate(checkDate);
    var newCheck = parseInt(currentDate.split('-')[0]);
    var checkMonth = parseInt(currentDate.split('-')[1]);
    var checkDay = parseInt(currentDate.split('-')[2]);
    this.postsService
      .getPost(id, checkDay, checkMonth, newCheck)
      .subscribe((post) => {
        console.log(post, 'post');
        this.postInfo = post.data;
      });
  }
  handleFomatDate(dateString: any) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  handleGotoPage(page: number | string) {
    this.gotoPage.emit(page);
  }
  handlePrevPage() {
    // console.log(this.paginationObj.hasPrevPage);
    this.prevPage.emit(this.paginationObj.hasPrevPage);
  }
  handleNextPage() {
    // console.log(this.paginationObj.hasNextPage);
    this.nextPage.emit(this.paginationObj.hasNextPage);
  }
  handelApproved(id: string) {
    var data = {
      id: id,
      status: 'Approved',
    };
    this.postsService.updateStatusField(data).subscribe((items) => {
      console.log(items);
      this.toastr.success('Updated');
      setTimeout(() => {
        window.location.reload();
      }, 350);
    });
  }
  handelRejected(id: string) {
    let userInput = prompt('Nhập vào lý do từ chối của bạn:');
    if (userInput == null || userInput.trim() == '') {
      this.toastr.error('Lý do là bắt buộc !');
      return;
    } else {
      var data = {
        id: id,
        status: 'Reject',
        reason: userInput,
      };
      this.postsService.updateStatusField(data).subscribe((items) => {
        this.toastr.success('Updated');
        setTimeout(() => {
          window.location.reload();
        }, 350);
      });
    }
  }
  formatDate(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
