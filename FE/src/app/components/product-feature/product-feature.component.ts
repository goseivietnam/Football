import { FormBuilder, Validators } from '@angular/forms';

import { CategoryService } from 'src/app/services/category/category.service';
import { Component } from '@angular/core';
import { ICategory } from 'src/app/interfaces/Category';
import { IPosts } from 'src/app/interfaces/Product';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-feature',
  templateUrl: './product-feature.component.html',
  styleUrls: ['./product-feature.component.scss'],
})
export class ProductFeatureComponent {
  isActive: boolean = false;
  posts: IPosts[] = [];
  categories: ICategory[] = [];

  currentPage: number = 1;
  totalDocs!: number;
  totalPages!: number;
  totalPagesArray!: number[];
  hasNextPage: boolean = false;
  hasPrevPage: boolean = false;
  ishiddenPagination: boolean = false;

  priceForm = this.fb.group({
    min: [0, [Validators.required, Validators.min(0)]],
    max: [0, [Validators.required, Validators.min(0)]],
  });

  searchForm = this.fb.group({
    search: [''],
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private postService: ProductsService,
    private router: Router
  ) {
    this.getAllPosts();
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categoriesData) => {
      this.categories = categoriesData.data;
      console.log(
        '🚀 ~ ProductFeatureComponent ~ this.categoryService.getAllCategories ~ categories:',
        this.categories
      );
      // console.log(this.categories);
    });
  }

  getAllPosts() {
    this.postService
      .getPostsApporved(this.currentPage)
      .subscribe((allPosts) => {
        this.posts = allPosts.posts.docs;

        this.currentPage = allPosts.posts.page;
        this.totalPages = allPosts.posts.totalPages;
        this.hasNextPage = allPosts.posts.hasNextPage;
        this.hasPrevPage = allPosts.posts.hasPrevPage;
        this.ishiddenPagination = false;

        this.totalPagesArray = Array(this.totalPages)
          .fill(0)
          .map((_, index) => index + 1);
        // console.log(this.totalPage);

        this.router.navigate(['/blog'], {
          queryParams: { page: this.currentPage },
        });
      });
  }

  getPosts(id: string) {
    // console.log(id);
    this.categoryService.getCategoryPostId(id).subscribe((postList) => {
      console.log(postList);
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

  /* filter price */
  filterProductByPrice(min: number, max: number) {
    this.postService.filterPrice(min, max).subscribe((data) => {
      this.posts = data.posts;
    });
  }

  submitPriceFilter() {
    if (this.priceForm.invalid) return;
    const { min, max } = this.priceForm.value;
    this.filterProductByPrice(min as number, max as number);
  }

  sortByPrice(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    switch (selectedValue) {
      case 'asc':
        this.posts.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'desc':
        this.posts.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      default:
        this.getAllPosts();
        break;
    }
  }

  searchPost() {
    const keyword = this.searchForm.value.search;

    if (!keyword) {
      this.getAllPosts();
      return;
    }
    this.posts = this.posts.filter((post) =>
      post.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}
