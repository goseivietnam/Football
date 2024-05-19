import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/interfaces/Category';
import { ImagePreview } from 'src/app/interfaces/Image';
import { IPosts } from 'src/app/interfaces/Product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import { MyUploadAdapter } from '../myuploadAdapter';
import { ServicesService } from 'src/app/services/service/services.service';
import { environment } from 'src/environment';
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
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements AfterViewInit {
  tempFile: any;
  user: any;
  EditForm = this.builder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    content: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(4)]],
    images: [[''], [Validators.required]],
    author: [''],
    description: ['', [Validators.required]],
    service: [''],
    category: ['', [Validators.required]],
    is_active: [''],
    status: ['', [Validators.required]],
    price: [0, [Validators.required,positiveNumber]],
  });
  categories: ICategory[] = [];
  public Editor = ClassicEditor;
  public ContentPost!: IPosts;
  imagePreviews: ImagePreview[] = [];
  nextImageId = 0;
  service: any[] = [];
  service2: any[] = [];
  urlImage: string = environment.API_URL + '/root/';
  dataIdPost : any;
  urls: any[] = [];
  selectedServices: { id: string; Price: number; name: string }[] = [];
  constructor(
    private postsService: ProductsService,
    private router: Router,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private uploadImageService: UploadImageService,
    private http: HttpClient,
    private categoryService: CategoryService,
    private ServicesService: ServicesService,
    private params: ActivatedRoute
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.user, 'ok');
    this.getAllCategories();
    this.ngAfterViewInit();
    this.getAllService();
  }
  getAllService() {
    this.ServicesService.getAlService().subscribe((categories) => {
      console.log(categories, 'service');
      this.service2 = categories.data;
    });
  }
  ngAfterViewInit(): void {
    const id = this.params.snapshot.params['id'];
    var checkDate = new Date();
    var currentDate: any = this.formatDate(checkDate);
    var newCheck = parseInt(currentDate.split('-')[0]);
    var checkMonth = parseInt(currentDate.split('-')[1]);
    var checkDay = parseInt(currentDate.split('-')[2]);
    this.postsService
      .getPost(id!, checkDay, checkMonth, newCheck)
      .subscribe((data) => {
        this.service = data.data.services;
        this.dataIdPost = data.data.picture
        this.EditForm.patchValue({
          title: data.data.name,
          address: data.data.address,
          price: data.data.price,
          content: data.data.description,
          status: data.data.status,
        });
        console.log(this.service, 'cdc');
      });
  }

  /* get data */
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories.data;
    });
  }

  handleFileInput(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.urls.push(files[i]);
    }
  }
  formatDate(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
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
    const id = this.params.snapshot.params['id'];
    /* lấy ra thông tin người dùng */
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user) {
      this.toastr.error('Bạn chưa đăng nhập');
      return;
    }

    const post = {
      id: id,
      title: this.EditForm.value.title,
      address: this.EditForm.value.address,
      price: this.EditForm.value.price,
      images: this.urls[0],
      Description: this.EditForm.value.content,
      status: this.EditForm.value.status,
    };

    const putData = new FormData();
    if (this.EditForm.value.title) {
      putData.append('Name', this.EditForm.value.title);
    }
    putData.append('Id', id);
    if (this.EditForm.value.content) {
      putData.append('Description', this.EditForm.value.content);
    }
    if (this.EditForm.value.address) {
      putData.append('Address', this.EditForm.value.address);
    }
    if (this.EditForm.value.price) {
      putData.append('price', this.EditForm.value.price.toString());
    }
    if (this.EditForm.value.status) {
      putData.append('status', this.EditForm.value.status);
    }
    putData.append('picture', this.urls[0]);

    this.postsService.updatePost(putData).subscribe(
      () => {
        this.toastr.success('Chỉnh sửa thành công');
        this.router.navigate(['/admin/manager-product']);
        this.EditForm.reset();
      },
      () => {
        this.toastr.error('Chỉnh sửa thất bại');
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
  isItemSelected(itemId: string): boolean {
    return this.selectedServices.some((item) => item.id === itemId);
  }
  handelRemove(i: any) {
    console.log(this.service);
    this.service.filter((item) => item.id != i);
    this.postsService.deleteServiceField(i).subscribe((data) => {
      console.log('data');

      this.toastr.success('remove serviceed item');
      setTimeout(() => {
        window.location.reload();
      }, 450);
    });
  }
  onServiceSelectionChange(service: any) {
    console.log('service selection change', service);
    const priceInput = prompt('Nhập giá cho dịch vụ', '0');
    if (priceInput !== null && Number(priceInput) > 1) {
      const price = parseFloat(priceInput);
      if (!isNaN(price)) {
        this.service.push({
          id: service.id,
          serviceName: service.name,
          price: price,
        });
        const newData = {
          serviceFeeId: service.id,
          fieldId: this.params.snapshot.params['id'],
          price: price,
        };
        this.postsService.createServiceField(newData).subscribe((newData) => {
          console.log('ok');
        });
        console.log(this.selectedServices, 'selectedServices');
      } else {
        alert('Vui lòng nhập giá hợp lệ.');
      }
    }else{
      alert('Vui lòng nhập giá hợp lệ.');

    }
  }

  handelEdit(id: string){
    const priceInput = prompt('Nhập giá cho dịch vụ', '0');
    if (priceInput !== null && Number(priceInput) > 1) {
      const price = parseFloat(priceInput);
      if (!isNaN(price)) {
        const newData = {
          id: id,
          price: price,
        };
        this.postsService.editServiceField(newData).subscribe((newData) => {
          console.log('ok');
          setTimeout(()=>{
            window.location.reload()
          },450)
        });
        console.log(this.selectedServices, 'selectedServices');
      } else {
        alert('Vui lòng nhập giá hợp lệ.');
      }
    }else{
      alert('Vui lòng nhập giá hợp lệ.');

    }
  }
}
