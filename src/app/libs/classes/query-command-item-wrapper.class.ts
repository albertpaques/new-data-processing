import { Type } from '@angular/core';
import { QueryCommandItemSetup } from '../types';

export class QueryCommandItemWrapper {
  constructor(
    public component: Type<any>,
    public setup: QueryCommandItemSetup
  ) {}
}
