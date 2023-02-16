import { Component, Input } from '@angular/core';

@Component({
  selector: 'corref-qry-cmd',
  template: `
    <base-qry-cmd
      [id]="id"
      [title]="title"
      [imageUrl]="imageUrl"
      [inSlotIsExist]="true"
      [multiInSlotIsExist]="true"
      [outSlotIsExist]="true"
      [branchSlotIsExist]="true"
      [multiOutSlotIsExist]="false"
      (slotOnClick)="slotOnClick($event)"
    ></base-qry-cmd>
  `,
})
export class CorrefQueryCommand {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() imageUrl: string = '';

  slotOnClick(slotType: string) {}
}
