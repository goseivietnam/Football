// import { AuthService } from 'src/app/services/auth/auth.service';
// import { Component } from '@angular/core';
// import { Location } from '@angular/common';
// import { MenuItems } from 'src/app/interfaces/ISidebarAdmin';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-sidebar-admin',
//   templateUrl: './sidebar-admin.component.html',
//   styleUrls: ['./sidebar-admin.component.scss'],
// })
// export class SidebarAdminComponent {
//   urlPath: string = 'dashboard';
//   // constructor(private service: AuthService, private direct: Router) {}
//   /* router link */
//   menuItems: any[] = [
//     {
//       routerLink: 'dashboard',
//       label: 'Dashboard',
//       icon: 'fas fa-tachometer-alt',
//       isActive: true,
//     },
//     {
//       routerLink: 'order',
//       label: 'Đơn hàng',
//       icon: 'fa-solid fa-cart-shopping',
//       isActive: false,
//     },
//     {
//       routerLink: 'manager-users',
//       label: 'Người dùng',
//       icon: 'fas fa-users',
//       isActive: false,
//       queryParams: { type: 'EndUser' }
//     },
//     {
//       routerLink: 'manager-staff',
//       label: 'Nhân viên',
//       icon: 'fas fa-users',
//       isActive: false,
//       queryParams: { type: 'Staff' }
//     },
//     {
//       routerLink: 'manager-owner',
//       label: 'Chủ sân',
//       icon: 'fas fa-users',
//       isActive: false,
//       queryParams: { type: 'FieldOwner' }
//     },
//     {
//       routerLink: 'manager-manager',
//       label: 'manager',
//       icon: 'fas fa-users',
//       isActive: false,
//       queryParams: { type: 'Manager' }
//     },
//     {
//       routerLink: 'manager-product',
//       label: 'Sân bóng',
//       icon: 'fa-solid fa-file',
//       isActive: false,
//     },
//     {
//       routerLink: 'manager-categories',
//       label: 'Khu vực',
//       icon: 'fa-solid fa-list',
//       isActive: false,
//     },
//     {
//       routerLink: 'trash-can',
//       label: 'Trash can',
//       icon: 'fa-solid fa-trash',
//       isActive: false,
//     },
//     {
//       routerLink: 'analytics',
//       label: 'Thống kê',
//       icon: '',
//       isActive: false,
//     },
//   ];
//   constructor(
//     private location: Location,
//     private service: AuthService,
//     private direct: Router
//   ) {
//     this.urlPath = this.location.path();
//     this.setActiveItemByUrl(this.urlPath);
//   }
//   /* setActiveItem */
//   setActiveItem(item: MenuItems) {
//     this.menuItems.forEach((item) => {
//       item.isActive = false;
//     });
//     item.isActive = true;
//   }
//   /* setActiveItemByUrl */
//   setActiveItemByUrl(url: string) {
//     this.menuItems.forEach((item) => {
//       console.log(item,"cccc")
//       if (item.routerLink === `/admin/${url}`) {
//         item.isActive = true;
//       }
//     });
//   }
//   onLogout() {
//     this.service.logOut();
//     this.direct.navigateByUrl('login-admin');
//   }
// }
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItems } from 'src/app/interfaces/ISidebarAdmin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss'],
})
export class SidebarAdminComponent {
  urlPath: string = 'dashboard';
  menuItems: any[] = [];

  constructor(
    private location: Location,
    private service: AuthService,
    private direct: Router
  ) {
    this.urlPath = this.location.path();
    this.setActiveItemByUrl(this.urlPath);

    // Kiểm tra loại người dùng và cài đặt menuItems tương ứng
    const userType = JSON.parse(localStorage.getItem('user')!);
    console.log(userType, 'userType');
    switch (userType.type) {
      case 'Admin':
        this.menuItems = [
          {
            routerLink: 'dashboard',
            label: 'Thống kê',
            icon: 'fas fa-tachometer-alt',
            isActive: true,
          },
          {
            routerLink: 'order',
            label: 'Đơn hàng',
            icon: 'fa-solid fa-cart-shopping',
            isActive: false,
          },
          {
            routerLink: 'manager-users',
            label: 'Người dùng',
            icon: 'fas fa-users',
            isActive: false,
            queryParams: { type: 'EndUser' },
          },
          {
            routerLink: 'manager-staff',
            label: 'Nhân viên',
            icon: 'fas fa-users',
            isActive: false,
            queryParams: { type: 'Staff' },
          },
          {
            routerLink: 'manager-owner',
            label: 'Chủ sân',
            icon: 'fas fa-users',
            isActive: false,
            queryParams: { type: 'FieldOwner' },
          },
          {
            routerLink: 'manager-manager',
            label: 'Quản lý',
            icon: 'fas fa-users',
            isActive: false,
            queryParams: { type: 'Manager' },
          },
          {
            routerLink: 'manager-product',
            label: 'Sân bóng',
            icon: 'fa-solid fa-file',
            isActive: false,
          },
          {
            routerLink: 'manager-categories',
            label: 'Khu vực',
            icon: 'fa-solid fa-list',
            isActive: false,
          },
          {
            routerLink: 'all-service',
            label: 'Dịch vụ',
            icon: 'fa-solid fa-trash',
            isActive: false,
          },

          // Thêm các mục khác cho Admin ở đây
        ];
        break;
      case 'Staff':
        this.menuItems = [
          {
            routerLink: 'dashboard',
            label: 'Thống kê',
            icon: 'fas fa-tachometer-alt',
            isActive: true,
          },
          {
            routerLink: 'order',
            label: 'Đơn hàng',
            icon: 'fa-solid fa-cart-shopping',
            isActive: false,
          },
          {
            routerLink: 'manager-users',
            label: 'Người dùng',
            icon: 'fas fa-users',
            isActive: false,
            queryParams: { type: 'EndUser' },
          },

          {
            routerLink: 'manager-owner',
            label: 'Chủ sân',
            icon: 'fas fa-users',
            isActive: false,
            queryParams: { type: 'FieldOwner' },
          },

          {
            routerLink: 'manager-product',
            label: 'Sân bóng',
            icon: 'fa-solid fa-file',
            isActive: false,
          },
          {
            routerLink: 'manager-categories',
            label: 'Khu vực',
            icon: 'fa-solid fa-list',
            isActive: false,
          },
          {
            routerLink: 'trash-can',
            label: 'Trash can',
            icon: 'fa-solid fa-trash',
            isActive: false,
          },
        ];
        break;
      case 'Manager':
        this.menuItems = [
          {
            routerLink: 'dashboard',
            label: 'Thống kê',
            icon: 'fas fa-tachometer-alt',
            isActive: true,
          },
          {
            routerLink: 'order',
            label: 'Đơn hàng',
            icon: 'fa-solid fa-cart-shopping',
            isActive: false,
          },
          {
            routerLink: 'manager-users',
            label: 'Người dùng',
            icon: 'fas fa-users',
            isActive: false,
            queryParams: { type: 'EndUser' },
          },
          {
            routerLink: 'manager-staff',
            label: 'Nhân viên',
            icon: 'fas fa-users',
            isActive: false,
            queryParams: { type: 'Staff' },
          },
        ];
        break;
      case 'FieldOwner':
        this.menuItems = [
          {
            routerLink: 'dashboard',
            label: 'Thống kê',
            icon: 'fas fa-tachometer-alt',
            isActive: true,
          },
          {
            routerLink: 'order',
            label: 'Đơn hàng',
            icon: 'fa-solid fa-cart-shopping',
            isActive: false,
          },
          {
            routerLink: 'manager-product',
            label: 'Sân bóng',
            icon: 'fa-solid fa-file',
            isActive: false,
          },
        ];
        break;
      default:
    }
  }

  setActiveItem(item: MenuItems) {
    this.menuItems.forEach((item) => {
      item.isActive = false;
    });
    item.isActive = true;
  }

  setActiveItemByUrl(url: string) {
    this.menuItems.forEach((item) => {
      if (item.routerLink === `/admin/${url}`) {
        item.isActive = true;
      }
    });
  }

  onLogout() {
    this.service.logOut();
    this.direct.navigateByUrl('login-admin');
  }
}
