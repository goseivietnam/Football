import { CategoryService } from 'src/app/services/category/category.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/Category';
import { IPosts } from 'src/app/interfaces/Product';
import { ProductsService } from 'src/app/services/products/products.service';
import { environment } from 'src/environment';

@Component({
  selector: 'app-productsList-page',
  templateUrl: './productsList-page.component.html',
  styleUrls: ['./productsList-page.component.scss'],
})
export class ProductsListPageComponent {
  isActive = false;
  posts: IPosts[] = [];
  currentPage: number = 1;
  urlImage: string = environment.API_URL + '/root/';

  totalDocs!: number;
  totalPages!: number;
  totalPagesArray!: number[];
  hasNextPage: boolean = false;
  hasPrevPage: boolean = false;
  categories: ICategory[] = [];
  ishiddenPagination: boolean = false;
  constructor(
    private categoryService: CategoryService,
    private postService: ProductsService,
    private router: Router
  ) {
    this.getAllCategories();
    this.getAllPosts();
    // this.router.navigate(['/blog'], {
    //   queryParams: { page: this.currentPage },
    // });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categoriesData) => {
      this.categories = categoriesData.data;
    });
  }

  getAllPosts() {
    this.postService
      .getPostsApporved(this.currentPage)
      .subscribe((allPosts) => {
        console.log(allPosts, 'allPosts');
        this.posts = allPosts.data.items.filter(
          (a: any) => a.status == 'Approved'
        );
        this.currentPage = allPosts.posts.page;
        this.totalPages = allPosts.posts.totalPages;
        this.hasNextPage = allPosts.posts.hasNextPage;
        this.hasPrevPage = allPosts.posts.hasPrevPage;
        this.ishiddenPagination = false;

        this.totalPagesArray = Array(this.totalPages)
          .fill(0)
          .map((_, index) => index + 1);

        this.router.navigate(['/blog'], {
          queryParams: { page: this.currentPage },
        });
      });
  }

  getPosts(id: string) {
    this.categoryService.getCategoryPostId(id).subscribe((postList) => {
      if (postList.data.posts) {
        this.posts = postList.data.posts;
        this.ishiddenPagination = true;
        this.router.navigate(['/blog']);
      }
      this.isActive = !this.isActive;
    });
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getAllPosts();
  }

  prevPage() {
    if (this.hasPrevPage) {
      this.currentPage--;
      this.getAllPosts();
    }
  }

  nextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
      this.getAllPosts();
    }
  }
}
