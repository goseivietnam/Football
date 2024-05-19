import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AvatarDirective } from './Directive/avatar.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CommentsProductComponent } from './components/comments-product/comments-product.component';
import { ContentDetailPostsComponent } from './components/content-detail-posts/content-detail-posts.component';
import { FeatureComponent } from './components/feature/feature.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';

import { ManagerTrashCanComponent } from './components/manager-trash-can/manager-trash-can.component';
import { NewProductHomePageComponent } from './components/new-product-home/new-product-home.component';
import { PostsComponent } from './components/list-product-home/list-product-home.component';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { LayoutClientComponent } from './layouts/layout-client/layout-client.component';
import { LayoutManagerComponent } from './layouts/layout-manager/layout-manager.component';
import { LayoutModalAdminComponent } from './layouts/layout-modal-admin/layout-modal-admin.component';
import { AddCategoryComponent } from './modules/category/add-category/add-category.component';
import { EditCategoryComponent } from './modules/category/edit-category/edit-category.component';

import { PostAddComponent } from './modules/posts/product-add/post-add.component';
import { PostEditComponent } from './modules/posts/product-edit/post-edit.component';

import { AddUserComponent } from './modules/user/add-user/add-user.component';
import { EditUserComponent } from './modules/user/edit-user/edit-user.component';
import { ProductsListPageComponent } from './pages/productsList-page/productsList-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginPageAdminComponent } from './pages/login-page-admin/login-page-admin.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProductsDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ToastrModule } from 'ngx-toastr';
import { RelatedPostsComponent } from './components/related-posts/related-posts.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';
import { SliderComponent } from './components/slider/slider.component';
import { TrashCanPostComponent } from './modules/trash-can/trash-can-post/trash-can-post.component';
import { TrashCanUserComponent } from './modules/trash-can/trash-can-user/trash-can-user.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { RequestInterceptor } from './request/request.interceptor';

import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { ProductFeatureComponent } from './components/product-feature/product-feature.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { CartGioHangComponent } from './pages/cart-gio-hang/cart-gio-hang.component';
import { DonHangComponent } from './pages/don-hang/don-hang.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TeamCreateComponent } from './components/team-create/team-create.component';
import { CrateTeamAddComponent } from './components/crate-team-add/crate-team-add.component';
import { CrateTeamEditComponent } from './components/crate-team-edit/crate-team-edit.component';
import { MyTeamComponent } from './components/my-team/my-team.component';
import { DetailsDanhsachComponent } from './components/details-danhsach/details-danhsach.component';
import { DetailsDtComponent } from './components/details-dt/details-dt.component';
import { ServiceFeeComponent } from './components/service-fee/service-fee.component';
import { GetallServiceComponent } from './components/getall-service/getall-service.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { PriceDialogComponent } from './components/price-dialog/price-dialog.component';
import { InvitebymeComponent } from './components/invitebyme/invitebyme.component';
import { DetailsBookingComponent } from './components/details-booking/details-booking.component';
import { DetailsFieldAreaComponent } from './components/details-field-area/details-field-area.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutClientComponent,
    LayoutAdminComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SidebarAdminComponent,
    ManageUserComponent,
    ManageProductsComponent,
    CategoriesComponent,
    LoginPageComponent,
    SignupPageComponent,
    LayoutManagerComponent,
    SliderComponent,
    FeatureComponent,
    NewProductHomePageComponent,
    PostsComponent,
    LayoutModalAdminComponent,
    UserInfoComponent,
    ProductsDetailPageComponent,
    RelatedPostsComponent,
    ContentDetailPostsComponent,
    NotFoundPageComponent,
    AddUserComponent,
    LoginPageAdminComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AvatarDirective,
    PostAddComponent,
    ProductsListPageComponent,
    EditUserComponent,
    PostEditComponent,
    ManagerTrashCanComponent,
    TrashCanPostComponent,
    TrashCanUserComponent,
    SearchResultComponent,
    CommentsProductComponent,
    CartGioHangComponent,
    DonHangComponent,
    ProductFeatureComponent,
    ManageOrderComponent,
    AnalyticsComponent,
    ChangePasswordComponent,
    TeamCreateComponent,
    CrateTeamAddComponent,
    CrateTeamEditComponent,
    MyTeamComponent,
    DetailsDanhsachComponent,
    DetailsDtComponent,
    ServiceFeeComponent,
    GetallServiceComponent,
    EditServiceComponent,
    PriceDialogComponent,
    InvitebymeComponent,
    DetailsBookingComponent,
    DetailsFieldAreaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    CKEditorModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    SlickCarouselModule,
    CKEditorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    NgApexchartsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [
    // CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule {}
