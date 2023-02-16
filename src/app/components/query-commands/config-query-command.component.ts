import { Component, Input } from '@angular/core';

@Component({
  selector: 'config-qry-cmd',
  template: `
    <base-qry-cmd
      [id]="id"
      [title]="title"
      [imageUrl]="imageUrl"
      [inSlotIsExist]="false"
      [multiInSlotIsExist]="false"
      [outSlotIsExist]="false"
      [branchSlotIsExist]="false"
      [multiOutSlotIsExist]="false"
    ></base-qry-cmd>
  `,
})
export class ConfigQueryCommand {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() imageUrl: string = '';
}
