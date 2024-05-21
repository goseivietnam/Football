import { CategoryService } from './../../services/category/category.service';
import { Component } from '@angular/core';
import { ExcelServiceService } from './../../services/excelService/excel-service.service';
import { ICategory } from 'src/app/interfaces/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  title: string = 'Quản lý khu vực';
  routerLink: string = '/admin/add-category';
  theadTable: string[] = ['STT', 'Tên khu vực', 'Mô tả', 'Thao tác'];
  categories: any[] = [];
  detailsCategory: any = {};
  constructor(
    private categoryService: CategoryService,
    private excelServiceService: ExcelServiceService
  ) {
    this.getAllCategories();
  }
  /* get all categories */
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categoriesData) => {
      console.log(categoriesData, 'categoriesData');
      this.categories = categoriesData.data;
    });
  }
  /* handle edit category */
  handleEditCategory(items: any) {
    console.log(
      '🚀 ~ file: categories.component.ts:14 ~ CategoriesComponent ~ handleEditCategory ~ items:',
      items
    );
  }
  /* handle delete user */
  handleDeleteCategory(id: string) {
    if (window.confirm('Are you sure you want to delete'))
      this.categoryService
        .deleteCategory(id)
        .subscribe(() => this.getAllCategories());
  }
  /* export to excel */
  exportToExcel() {
    this.excelServiceService.exportToExcel(this.categories, 'categories');
  }
  getIdCategory(id: string) {
    this.categoryService.getCategoryById(id).subscribe((dataCategory) => {
      console.log(dataCategory);
      this.detailsCategory = dataCategory.data;
    });
  }
}
