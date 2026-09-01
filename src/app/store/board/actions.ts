import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/shared/item.interface';

export const loadData = createAction('[Task] load data');
export const loadDataSuccess = createAction('[Task] load data Success', props<{ items: Task[] }>());
export const loadDataError = createAction('[Task] load data Error', props<{ error: string }>());
