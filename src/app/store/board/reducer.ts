import { Task } from 'src/app/shared/item.interface';
import { createReducer, on } from '@ngrx/store';
import { loadData, loadDataError, loadDataSuccess } from 'src/app/store/board/actions';

export interface TaskState {
  items: Task[];
  loading: boolean;
  error?: string;
}
export const initialTaskState: TaskState = {
  items: [],
  loading: false,
};

export const taskReducer = createReducer(
  initialTaskState,
  on(loadData, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadDataSuccess, (state, { items }) => {
    debugger;
    return {
      ...state,
      items,
      loading: false,
    };
  }),
  on(loadDataError, (state) => ({
    ...state,
    loading: false,
    error: state.error,
  })),
);
