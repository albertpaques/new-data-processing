import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';

import { QueryCommandService } from '../../libs/services/query-command.service';

import { AppState } from '../../libs/types';
import { SetInSlot, SetOutSlot } from '../../libs/store/actions';

@Component({
  selector: 'base-qry-cmd',
  template: `
    <div
      class="base-qry-cmd"
      cdkDragBoundary=".boundary"
      cdkDrag
      [cdkDragFreeDragPosition]="dragPosition"
      (cdkDragEnded)="onDragEnded($event)"
      (cdkDragMoved)="onDragMoved($event)"    
    >
      <div class="title">
        <img [src]="imageUrl" />
        <span>{{ title }}</span>
      </div>

      <fa-icon
        *ngIf="inSlotIsExist"
        [icon]="inSlotIsActive ? faCheckSquare : faSquare"
        style="position: absolute; left: -2px; cursor: pointer"
        [id]="'in-' + id"
        [ngStyle]="{ top: multiInSlotIsExist ? '13px' : null }"
        (click)="_slotOnClick('in')"
      ></fa-icon>

      <fa-icon
        *ngIf="multiInSlotIsExist"
        [icon]="multiInSlotIsActive ? faCheckSquare : faSquare"
        style="position: absolute; left: -2px; cursor: pointer"
        [id]="'multiIn-' + id"
        [ngStyle]="{ bottom: multiInSlotIsExist ? '13px' : null }"
        (click)="_slotOnClick('multiIn')"
      ></fa-icon>

      <fa-icon
        *ngIf="outSlotIsExist"
        [icon]="outSlotIsActive ? faCheckSquare : faSquare"
        style="position: absolute; right: -2px; cursor: pointer"
        [id]="'out-' + id"
        [ngStyle]="{ top: branchSlotIsExist ? multiOutSlotIsExist ? '8px' : '13px' : null }"
        (click)="_slotOnClick('out')"
      ></fa-icon>

      <fa-icon
        *ngIf="branchSlotIsExist"
        [icon]="branchSlotIsActive ? faCheckSquare : faSquare"
        style="position: absolute; right: -2px; cursor: pointer"
        [id]="'branch-' + id"
        [ngStyle]="{ bottom: branchSlotIsExist ? multiOutSlotIsExist ? '22px' : '13px' : null }"
        (click)="_slotOnClick('branch')"
      ></fa-icon>

      <fa-icon
        *ngIf="multiOutSlotIsExist"
        [icon]="multiOutSlotIsActive ? faCheckSquare : faSquare"
        style="position: absolute; right: -2px; cursor: pointer"
        [id]="'multiOut-' + id"
        [ngStyle]="{ bottom: multiOutSlotIsExist ? '8px' : null }"
        (click)="_slotOnClick('multiOut')"
      ></fa-icon>
    </div>
  `,
  styles: [
    `
    .base-qry-cmd {
      position: fixed;
      transform: translate3d(260px, 120px, 0px);
      display: block;
      width: 100px;
      height: 100px;
      border: 1px solid #000000;
      cursor: pointer;
      background-color: #eeeeee;

      .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #000000;
      }
    }
  `,
  ],
})
export class BaseQueryCommand {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() imageUrl: string = '';

  @Input() inSlotIsExist: boolean = false;
  @Input() multiInSlotIsExist: boolean = false;
  @Input() outSlotIsExist: boolean = false;
  @Input() branchSlotIsExist: boolean = false;
  @Input() multiOutSlotIsExist: boolean = false;

  @Output() slotOnClick = new EventEmitter<string>();

  public faSquare = faSquare;
  public faCheckSquare = faCheckSquare;

  public inSlotIsActive: boolean = false;
  public multiInSlotIsActive: boolean = false;
  public outSlotIsActive: boolean = false;
  public branchSlotIsActive: boolean = false;
  public multiOutSlotIsActive: boolean = false;

  public dragPosition: any;

  constructor(
    private store: Store<AppState>,
    private queryCommandService: QueryCommandService
  ) {}

  onDragEnded(e: any) {
    const panZoomAPI = this.queryCommandService.panZoomAPI;
    console.log('panZoomAPI', panZoomAPI);

    const boundClientRect =
      e.source.element.nativeElement.getBoundingClientRect();

    console.log('boundClientRect', boundClientRect);

    console.log(
      'this.dragPosition',
      panZoomAPI.getViewPosition({ x: boundClientRect.x, y: boundClientRect.y })
    );
  }

  onDragMoved(e: any) {}

  _slotOnClick(slotType: string) {
    switch (slotType) {
      case 'in':
        this.inSlotIsActive = !this.inSlotIsActive;
        break;
      case 'multiIn':
        this.multiInSlotIsActive = !this.multiInSlotIsActive;
        break;
      case 'out':
        this.outSlotIsActive = !this.outSlotIsActive;
        break;
      case 'branch':
        this.branchSlotIsActive = !this.branchSlotIsActive;
        break;
      case 'multiOut':
        this.multiOutSlotIsActive = !this.multiOutSlotIsActive;
        break;
    }

    if (['in', 'multiIn'].indexOf(slotType) > -1) {
      this.store.dispatch(
        SetInSlot({
          slot: {
            itemName: this.id,
            slotName: slotType,
          },
        })
      );
    }

    if (['out', 'branch', 'multiOut'].indexOf(slotType) > -1) {
      this.store.dispatch(
        SetOutSlot({
          slot: {
            itemName: this.id,
            slotName: slotType,
          },
        })
      );
    }

    this.slotOnClick.emit(slotType);
  }
}
