import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from 'src/app/store/board/reducer';

export const selectorsTaskState = createFeatureSelector<TaskState>('task');

export const selectTaskState = createSelector(selectorsTaskState, (state) => state.items);
export const selectTaskLoading = createSelector(selectorsTaskState, (state) => state.loading);
export const selectTaskError = createSelector(selectorsTaskState, (state) => state.error);
