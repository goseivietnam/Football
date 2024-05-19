import { Component, Input } from '@angular/core';

import { IPosts } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-layout-modal-admin',
  templateUrl: './layout-modal-admin.component.html',
  styleUrls: ['./layout-modal-admin.component.scss'],
})
export class LayoutModalAdminComponent {
  @Input() titleModal: string = '';
  @Input() postInfo!: IPosts;
}
