import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { TaskService } from '../services/task.service';

@Injectable({
  providedIn: 'root',
})
export class UserRepo {
  private readonly _assigneeUser = signal<string[]>([]);
  private readonly _loading = signal(false);
  private readonly userService = inject(TaskService);
  private hasLoaded = false;

  readonly assigneeUser = this._assigneeUser.asReadonly();
  readonly loading = this._loading.asReadonly();

  getUsers(): void {
    if (this.hasLoaded || this._loading()) {
      return;
    }

    this._loading.set(true);
    this.userService
      .getUsers()
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe(({ users }) => {
        this._assigneeUser.set(users);
        this.hasLoaded = true;
      });
  }
}
