import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from 'src/app/components/categories/categories.component';
import { AddCategoryComponent } from 'src/app/modules/category/add-category/add-category.component';
import { EditCategoryComponent } from 'src/app/modules/category/edit-category/edit-category.component';
import { AddUserComponent } from 'src/app/modules/user/add-user/add-user.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { ManageProductsComponent } from 'src/app/components/manage-products/manage-products.component';
import { ManageUserComponent } from 'src/app/components/manage-user/manage-user.component';
import { ManagerTrashCanComponent } from 'src/app/components/manager-trash-can/manager-trash-can.component';
import { PostAddComponent } from 'src/app/modules/posts/product-add/post-add.component';
import { EditUserComponent } from 'src/app/modules/user/edit-user/edit-user.component';
import { LayoutAdminComponent } from '../../layouts/layout-admin/layout-admin.component';

import { ManageOrderComponent } from 'src/app/components/manage-order/manage-order.component';
import { PostEditComponent } from 'src/app/modules/posts/product-edit/post-edit.component';
import { AnalyticsComponent } from 'src/app/pages/analytics/analytics.component';
import { ServiceFeeComponent } from 'src/app/components/service-fee/service-fee.component';
import { GetallServiceComponent } from 'src/app/components/getall-service/getall-service.component';
import { EditServiceComponent } from 'src/app/components/edit-service/edit-service.component';
import { DetailsBookingComponent } from 'src/app/components/details-booking/details-booking.component';
import { DetailsFieldAreaComponent } from 'src/app/components/details-field-area/details-field-area.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'order', component: ManageOrderComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'manager-users', component: ManageUserComponent },
      { path: 'manager-staff', component: ManageUserComponent },
      { path: 'manager-owner', component: ManageUserComponent },
      { path: 'manager-manager', component: ManageUserComponent },
      { path: 'manager-product', component: ManageProductsComponent },
      { path: 'post-add', component: PostAddComponent },
      { path: 'post-edit/:id', component: PostEditComponent },
      { path: 'manager-categories', component: CategoriesComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'add-service', component: ServiceFeeComponent },
      { path: 'all-service', component: GetallServiceComponent },
      { path: 'edit-category/:id', component: EditCategoryComponent },
      { path: 'edit-service/:id', component: EditServiceComponent },
      { path: 'trash-can', component: ManagerTrashCanComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'details-booking/:id', component: DetailsBookingComponent },
      { path: 'details-field-area/:id', component: DetailsFieldAreaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutAdminRoutingModule {}
