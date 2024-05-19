import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { environment } from 'src/environment';

@Component({
  selector: 'app-details-field-area',
  templateUrl: './details-field-area.component.html',
  styleUrls: ['./details-field-area.component.scss'],
})
export class DetailsFieldAreaComponent {
  detailField: any[] = [];
  urlImage: string = environment.API_URL + '/root/';
  titleField: string = '';
  constructor(
    private categoryService: CategoryService,
    private params: ActivatedRoute
  ) {
    this.getIdCategory();
  }
  getIdCategory() {
    // getCategoryById
    var id = this.params.snapshot.params['id'];

    this.categoryService.getCategoryById(id).subscribe((category) => {
      this.detailField = category.data.fields;
      this.titleField = category.data.name;
    });
  }
}
