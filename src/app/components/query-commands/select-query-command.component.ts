import { Component, Input } from '@angular/core';

@Component({
  selector: 'select-qry-cmd',
  template: `
    <base-qry-cmd
      [id]="id"
      [title]="title"
      [imageUrl]="imageUrl"
      [inSlotIsExist]="false"
      [multiInSlotIsExist]="false"
      [outSlotIsExist]="true"
      [branchSlotIsExist]="false"
      [multiOutSlotIsExist]="false"
      (slotOnClick)="slotOnClick($event)"
    ></base-qry-cmd>
  `,
})
export class SelectQueryCommand {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() imageUrl: string = '';

  slotOnClick(slotType: string) {}
}
