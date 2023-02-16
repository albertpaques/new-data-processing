import { Injectable } from '@angular/core';
import { ConfigQueryCommand } from '../../components/query-commands/config-query-command.component';
import { SelectQueryCommand } from '../../components/query-commands/select-query-command.component';
import { QueryCommandItemWrapper } from '../classes/query-command-item-wrapper.class';

@Injectable()
export class QueryCommandService {
  private _panZoomAPI: any;

  set panZoomAPI(value: any) {
    this._panZoomAPI = value;
  }

  get panZoomAPI() {
    return this._panZoomAPI;
  }

  getItems() {
    return [
      new QueryCommandItemWrapper(ConfigQueryCommand, {
        id: 'config_92347923748',
        name: 'CONFIG_0',
      }),
      new QueryCommandItemWrapper(SelectQueryCommand, {
        id: 'select_23984283742',
        name: 'SELECT_0',
      }),
    ];
  }
}
