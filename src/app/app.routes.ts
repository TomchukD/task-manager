import { Routes } from '@angular/router';
import { Board } from 'src/app/pages/board/board';
import { Layout } from 'src/app/components/layout/layout';
import { TaskDetail } from 'src/app/pages/task-detail/task-detail';
import { Profile } from 'src/app/pages/profile/profile';
import { tasksResolver } from 'src/app/resolvers/tasks.resolver';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('src/app/pages/login/login').then((m) => m.Login),
  },
  {
    path: 'task-manager',
    component: Layout,
    children: [
      {
        path: 'board',
        component: Board,
        resolve: {
          tasks: tasksResolver,
        },
      },
      {
        path: 'board/task/:id',
        component: TaskDetail,
      },
      {
        path: 'profile',
        component: Profile,
      },
    ],
  },
  {
    path: '**',
    // redirectTo: '/task-manager/board',
    redirectTo: '/login',
  },
];
