import { ServicesService } from 'src/app/services/service/services.service';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/interfaces/Category';
import { ImagePreview } from 'src/app/interfaces/Image';
import { MyUploadAdapter } from '../myuploadAdapter';
import { CategoryService } from '../../../services/category/category.service';
import { ProductsService } from '../../../services/products/products.service';
import { UploadImageService } from '../../../services/uploadImage/upload-image.service';
function positiveNumber(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value === null || value === undefined || value === '') {
    return null; // If value is empty, leave validation to 'required' validator
  }
  const parsedValue = parseFloat(value);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    return { positiveNumber: true };
  }
  return null;
}
@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
})

export class PostAddComponent {
  checkUsedService: boolean = false;
  checkAddedService: boolean = false;
  postForm = this.builder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    content: ['', [Validators.required]],
    images: [[''], [Validators.required]],
    address: ['', [Validators.required]],
    author: [''],
    category: ['', [Validators.required]],
    service: ['', [Validators.required]],
    is_active: ['public', [Validators.required]],
    status: ['pending', [Validators.required]],
    price: [0, [Validators.required,positiveNumber]],
  });
  addForm = this.builder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    level: [''],
  });
  categories: any[] = [];
  service: any[] = [];
  selectedServices: { ServiceFeeId: string; Price: number; name: string }[] =
    [];
  public Editor = ClassicEditor;
  public editorContent = '';
  imagePreviews: ImagePreview[] = [];
  nextImageId = 0;
  urls: any[] = [];
  constructor(
    private postsService: ProductsService,
    private router: Router,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private uploadImageService: UploadImageService,
    private http: HttpClient,
    private categoryService: CategoryService,
    private ServicesService: ServicesService
  ) {
    this.getAllCategories();
    this.getAllService();
  }
  /* get data */
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories.data;
    });
  }
  getAllService() {
    this.ServicesService.getAlService().subscribe((categories) => {
      console.log(categories, 'service');
      this.service = categories.data;
    });
  }
  handleFileInput(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.urls.push(files[i]);
    }
  }
  handleRemoveImage(public_id: string) {
    if (!public_id) return;
    this.uploadImageService.deleteImage(public_id).subscribe(() => {
      this.imagePreviews = this.imagePreviews.filter(
        (image) => image.public_id !== public_id
      );
    });
  }
  handleSubmitPostForm() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user) {
      this.toastr.error('Bạn chưa đăng nhập');
      return;
    }
    const postData = new FormData();
    if (this.postForm.value.title) {
      postData.append('Name', this.postForm.value.title);
    }
    if (this.postForm.value.content) {
      postData.append('Description', this.postForm.value.content);
    }
    if (this.postForm.value.address) {
      postData.append('Address', this.postForm.value.address);
    }
    if (this.postForm.value.price) {
      postData.append('price', this.postForm.value.price.toString());
    }
    if (this.postForm.value.category) {
      postData.append('FieldAreaId', this.postForm.value.category.toString());
    }
    if (this.selectedServices) {
      for (let i = 0; i < this.selectedServices.length; i++) {
        const service = this.selectedServices[i];
        postData.append(`Services[${i}].ServiceFeeId`, service.ServiceFeeId);
        postData.append(`Services[${i}].Price`, service.Price.toString());
      }
    }
    for (const image of this.urls) {
      postData.append('picture', image);
    }
    this.postsService.createPost(postData).subscribe(
      () => {
        this.toastr.success('Thêm Sân bóng thành công');
        this.router.navigate(['/admin/manager-product']);
        this.postForm.reset();
      },
      () => {
        this.toastr.error('Thêm sản phẩm thất bại');
      }
    );
  }

  onEditorReady = (editor: any) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new MyUploadAdapter(loader, this.http);
    };
  };
  onServiceSelectionChange(selectedService: any) {
    const priceInput = prompt('Nhập giá cho dịch vụ', '0');
    if (priceInput !== null && Number(priceInput) > 1) {
      const price = parseFloat(priceInput);
      if (!isNaN(price)) {
        this.selectedServices.push({
          ServiceFeeId: selectedService.id,
          name: selectedService.name,
          Price: price,
        });
        this.checkUsedService = true;
        console.log(this.selectedServices, 'selectedServices');
      } else {
        alert('Vui lòng nhập giá hợp lệ.');
      }
    }else{
      alert('Vui lòng nhập giá hợp lệ.');
    }
  }
  isItemSelected(itemId: string): boolean {
    return this.selectedServices.some((item) => item.ServiceFeeId === itemId);
  }
  handelRemove(i: any) {
    this.selectedServices.splice(i, 1);
    if (this.selectedServices.length == 0) {
      this.checkUsedService = false;
    }
  }
  AddNewService() {
    this.checkAddedService = true;
  }
  closeDrawer() {
    this.checkAddedService = false;
  }
  createTeamByUser() {
    if (this.addForm.invalid) {
      this.toastr.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const category: any = {
      name: this.addForm.value.name || '',
      description: this.addForm.value.description || '',
      icon: this.addForm.value.level || '213312',
    };
    this.ServicesService.createService(category).subscribe((data) => {
      this.onServiceSelectionChange(data.data);
      this.checkUsedService = true;
      this.checkAddedService = false;
      this.addForm.reset();

    });
  }
}
