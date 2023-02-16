import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  INIT,
  UPDATE,
  createReducer,
  on,
} from '@ngrx/store';
import {
  AppState,
  EndpointSlot,
  QueryCommandItem,
  WorkspaceState,
} from '../types';
import { AddToTree, SetInSlot, SetOutSlot, UpdateTree } from './actions';

const initialState: WorkspaceState = {
  inSlot: null,
  outSlot: null,
  queryCommandTree: [],
};

const workspaceReducer = createReducer(
  initialState,
  on(
    SetInSlot,
    (workspaceState: WorkspaceState, prop: { slot: EndpointSlot }) => {
      const _workspaceState = { ...workspaceState };
      _workspaceState.inSlot = prop.slot;

      return {
        ...workspaceState,
        ..._workspaceState,
      };
    }
  ),
  on(
    SetOutSlot,
    (workspaceState: WorkspaceState, prop: { slot: EndpointSlot }) => {
      const _workspaceState = { ...workspaceState };
      _workspaceState.outSlot = prop.slot;

      return {
        ...workspaceState,
        ..._workspaceState,
      };
    }
  ),
  on(
    AddToTree,
    (workspaceState: WorkspaceState, prop: { item: QueryCommandItem }) => {
      const _workspaceState = { ...workspaceState };
      let _queryCommandTree = [..._workspaceState.queryCommandTree];

      if (!_queryCommandTree) {
        _queryCommandTree = [];
      }

      _queryCommandTree.push(prop.item);

      _workspaceState.queryCommandTree = _queryCommandTree;

      return {
        ...workspaceState,
        ..._workspaceState,
      };
    }
  ),
  on(
    UpdateTree,
    (
      workspaceState: WorkspaceState,
      prop: {
        inObj: {
          item: QueryCommandItem;
          slot: EndpointSlot;
        };
        outObj: {
          item: QueryCommandItem;
          slot: EndpointSlot;
        };
      }
    ) => {
      const _workspaceState = { ...workspaceState };
      const { queryCommandTree } = _workspaceState;

      if (queryCommandTree && queryCommandTree.length === 0) {
      }

      return {
        ...workspaceState,
      };
    }
  )
);

export const reducers: ActionReducerMap<AppState> = {
  workspace: workspaceReducer,
};

export function storageMetaReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state, action) {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem('__state__');
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem('__state__');
        }
      }
    }

    const nextState = reducer(state, action);
    localStorage.setItem('__state__', JSON.stringify(nextState));
    return nextState;
  };
}

export const metaReducers: MetaReducer<AppState>[] = [storageMetaReducer];
