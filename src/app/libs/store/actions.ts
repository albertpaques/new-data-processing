import { createAction, props } from '@ngrx/store';
import { EndpointSlot, QueryCommandItem } from '../types';

export const SetInSlot = createAction(
  'SetInSlot',
  props<{ slot: EndpointSlot }>()
);

export const SetOutSlot = createAction(
  'SetOutSlot',
  props<{ slot: EndpointSlot }>()
);

export const AddToTree = createAction(
  'AddToTree',
  props<{ item: QueryCommandItem }>()
);

export const UpdateTree = createAction(
  'UpdateTree',
  props<{
    inObj: {
      item: QueryCommandItem;
      slot: EndpointSlot;
    };
    outObj: {
      item: QueryCommandItem;
      slot: EndpointSlot;
    };
  }>()
);
