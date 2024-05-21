import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { ExcelServiceService } from 'src/app/services/excelService/excel-service.service';
import { ServicesService } from 'src/app/services/service/services.service';

@Component({
  selector: 'app-getall-service',
  templateUrl: './getall-service.component.html',
  styleUrls: ['./getall-service.component.scss']
})
export class GetallServiceComponent {
  title: string = 'Quản lý dịch vụ';
  routerLink: string = '/admin/add-category';
  theadTable: string[] = ['STT', 'Tên service', 'Mô tả', 'icons' , 'Thao tác'];
  categories: any[] = [];
  detailsCategory: any = {};
  constructor(
    private categoryService: CategoryService,
    private excelServiceService: ExcelServiceService,
    private ServicesService : ServicesService

  ) {
    this.getAllCategories();
  }
  /* get all categories */
  getAllCategories() {
    this.ServicesService.getAlService().subscribe((categoriesData) => {
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
      this.ServicesService
        .deleteService(id)
        .subscribe(() => this.getAllCategories());
  }
  /* export to excel */
  exportToExcel() {
    this.excelServiceService.exportToExcel(this.categories, 'categories');
  }
  getIdCategory(id: string) {
    this.ServicesService
      .getIdService(id)
      .subscribe((dataCategory : any) => {
        console.log(dataCategory)
        this.detailsCategory = dataCategory.data
      });
  }
}
