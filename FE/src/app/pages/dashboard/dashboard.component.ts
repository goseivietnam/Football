import { IPostAnalytics, IPosts } from 'src/app/interfaces/Product';

import { Component } from '@angular/core';
import { IUserAnalytics } from 'src/app/interfaces/User';
import { ProductsService } from 'src/app/services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  countPost: IPostAnalytics[] = [];
  countUser: IUserAnalytics[] = [];
  pendingPosts: IPosts[] = [];
  constructor(
    private postsService: ProductsService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.getCountPost();
    this.getCountUser();
    this.getPostPending();
  }
  /* get count post */
  getCountPost() {
    this.postsService
      .getPostByDate()
      .subscribe((res) => (this.countPost = res));
  }
  /* get count user */
  getCountUser() {
    this.userService.getCountUser().subscribe((res) => {
      this.countUser = res;
    });
  }
  /* pending post */
  getPostPending() {
    this.postsService.getPostPending().subscribe((res) => {
      this.pendingPosts = res.posts.docs;
    });
  }
  /* approved post */
  approvePost(id: string) {
    this.postsService.updateApprovedPost(id).subscribe(() => {
      this.getPostPending();
      this.toastr.success('Approved post successfully');
    });
  }
  /* reject post */
  rejectedPost(id: string) {
    this.postsService.deleteFakePost(id).subscribe(() => {
      this.getPostPending();
      this.toastr.success('Rejected post successfully');
    });
  }
}
