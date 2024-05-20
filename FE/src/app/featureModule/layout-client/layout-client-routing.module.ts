import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListPageComponent } from 'src/app/pages/productsList-page/productsList-page.component';
import { CartGioHangComponent } from 'src/app/pages/cart-gio-hang/cart-gio-hang.component';

import { DonHangComponent } from 'src/app/pages/don-hang/don-hang.component';
import { ProductsDetailPageComponent } from 'src/app/pages/product-detail-page/product-detail-page.component';
import { LayoutClientComponent } from '../../layouts/layout-client/layout-client.component';
import { HomepageComponent } from '../../pages/homepage/homepage.component';
import { UserInfoComponent } from '../../pages/user-info/user-info.component';
import { CartGioHangComponent2 } from 'src/app/components/cart-gio-hang/cart-gio-hang.component';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';
import { TeamCreateComponent } from 'src/app/components/team-create/team-create.component';
import { CrateTeamAddComponent } from 'src/app/components/crate-team-add/crate-team-add.component';
import { CrateTeamEditComponent } from 'src/app/components/crate-team-edit/crate-team-edit.component';
import { MyTeamComponent } from 'src/app/components/my-team/my-team.component';
import { DetailsDanhsachComponent } from 'src/app/components/details-danhsach/details-danhsach.component';
import { DetailsDtComponent } from 'src/app/components/details-dt/details-dt.component';
import { InvitebymeComponent } from 'src/app/components/invitebyme/invitebyme.component';
import { DetailsBookingComponent } from 'src/app/components/details-booking/details-booking.component';
import { CreateFeeServiceComponent } from 'src/app/components/create-fee-service/create-fee-service.component';
import { EditFeeServiceComponent } from 'src/app/components/edit-fee-service/edit-fee-service.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutClientComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'user-info/:id',
        component: UserInfoComponent,
      },
      {
        path: 'posts/:id',
        component: ProductsDetailPageComponent,
      },
      {
        path: 'cart-gio-hang',
        component: CartGioHangComponent2,
      },
      {
        path: 'blog',
        component: ProductsListPageComponent,
      },

      {
        path: 'changePassword',
        component: ChangePasswordComponent,
      },
      {
        path: 'don-hang',
        component: DonHangComponent,
      },
      { path: 'details-book/:id', component: DetailsBookingComponent },
    ],
  },
  {
    path: 'cart',
    component: CartGioHangComponent,
  },
  {
    path: 'create-team',
    component: TeamCreateComponent,
  },
  {
    path: 'by-team',
    component: MyTeamComponent,
  },
  {
    path: 'details/:id',
    component: DetailsDtComponent,
  },
  {
    path: 'create-team/add-team',
    component: CrateTeamAddComponent,
  },
  {
    path: 'create-team/edit-team/:id',
    component: CrateTeamEditComponent,
  },
  {
    path: 'create-team/all',
    component: DetailsDanhsachComponent,
  },
  {
    path: 'create-team/byme',
    component: InvitebymeComponent,
  },
  {
    path: 'create-fee-service/:id',
    component: CreateFeeServiceComponent,
  },
  {
    path: 'edit-fee-service/:id',
    component: EditFeeServiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutClientRoutingModule {}
