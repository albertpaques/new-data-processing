import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PanZoomAPI, PanZoomConfig } from 'ngx-panzoom';
import { QueryCommandItemWrapper } from '../../libs/classes/query-command-item-wrapper.class';
import { QueryCommandItemsAnchorDirective } from '../../libs/directives/query-command-items-anchor.directive';
import { Subject, combineLatest, skipWhile } from 'rxjs';

import { QueryCommandService } from '../../libs/services/query-command.service';

import { ConfigQueryCommand } from '../query-commands/config-query-command.component';
import { SelectQueryCommand } from '../query-commands/select-query-command.component';
import { CorrefQueryCommand } from '../query-commands/corref-query-command.component';

import { AppState, QueryCommandItem } from '../../libs/types';
import { AddToTree } from '../../libs/store/actions';
import {
  inSlotSelector,
  outSlotSelector,
  queryCommandTreeSelector,
} from '../../libs/store/selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'workspace-comp',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  public scaleValue: number = 1;
  public panZoomConfig: PanZoomConfig = new PanZoomConfig({
    acceleratePan: false,
    zoomLevels: 3.5,
    initialZoomLevel: 2,
    scalePerZoomLevel: 2,
    initialPanX: 0,
    initialPanY: 0,
    zoomStepDuration: 0.2,
    freeMouseWheelFactor: 0.08,
    zoomToFitZoomLevelFactor: 0.95,
    dragMouseButton: 'left',
    zoomOnDoubleClick: false,
    zoomOnMouseWheel: false,
    zoomButtonIncrement: 1,
    freeMouseWheel: false,
    noDragFromElementClass: 'pan-zoom-frame',
  });
  public queryCommandTree: QueryCommandItem[] = [];

  private subject: Subject<QueryCommandItemWrapper> = new Subject();
  private viewContainerRef: ViewContainerRef = null;

  @ViewChild(QueryCommandItemsAnchorDirective, { static: true })
  queryCommandItemsAnchor!: QueryCommandItemsAnchorDirective;

  constructor(
    private store: Store<AppState>,
    private queryCommandService: QueryCommandService
  ) {}

  ngOnInit(): void {
    this.viewContainerRef = this.queryCommandItemsAnchor.viewContainerRef;

    this.panZoomConfig.api.subscribe((api: PanZoomAPI) => {
      this.queryCommandService.panZoomAPI = api;
    });

    combineLatest([
      this.store.select(inSlotSelector).pipe(skipWhile((inSlot) => !inSlot)),
      this.store.select(outSlotSelector).pipe(skipWhile((outSlot) => !outSlot)),
    ]).subscribe(([inSlot, outSlot]) => {
      if (inSlot && outSlot) {
        console.log('connection exist!');
      }
    });

    this.subject.subscribe((_item: QueryCommandItemWrapper) => {
      console.log('_item', _item);
      const _containerRef = this.viewContainerRef.createComponent(
        _item.component
      );
      _containerRef.instance.id = _item.setup.id;
      _containerRef.instance.title = _item.setup.name;
    });

    this.store
      .select(queryCommandTreeSelector)
      .subscribe((queryCommandTree: QueryCommandItem[]) => {
        console.log('queryCommandTree', queryCommandTree);
        this._queryCommandItemFactory(queryCommandTree);
      });
  }

  _queryCommandItemFactory(queryCommandTree: QueryCommandItem[]) {
    if (queryCommandTree && queryCommandTree.length > 0) {
      this.viewContainerRef.clear();

      for (let item of queryCommandTree) {
        switch (item.cmdType) {
          case 'config':
            this.subject.next(
              new QueryCommandItemWrapper(ConfigQueryCommand, {
                id: `config_${new Date().getTime()}`,
                name: 'CONFIG',
              })
            );
            this;
            break;
          case 'select':
            this.subject.next(
              new QueryCommandItemWrapper(SelectQueryCommand, {
                id: `select_${new Date().getTime()}`,
                name: 'SELECT',
              })
            );
            break;
          case 'corref':
            this.subject.next(
              new QueryCommandItemWrapper(CorrefQueryCommand, {
                id: `corref_${new Date().getTime()}`,
                name: 'CORREF',
              })
            );
            break;
        }
      }
    }
  }

  addCmd(cmd: string) {
    this.store.dispatch(
      AddToTree({
        item: {
          id: `${cmd}_${new Date().getTime()}`,
          cmdType: cmd,
        },
      })
    );
  }
}
