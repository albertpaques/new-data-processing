import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkspaceState } from '../types';

const workspaceSelector = createFeatureSelector<WorkspaceState>('workspace');

export const inSlotSelector = createSelector(
  workspaceSelector,
  (workspace) => workspace.inSlot
);

export const outSlotSelector = createSelector(
  workspaceSelector,
  (workspace) => workspace.outSlot
);

export const queryCommandTreeSelector = createSelector(
  workspaceSelector,
  (workspace) => workspace.queryCommandTree
);
