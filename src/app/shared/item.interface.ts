export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string | null;
  deadline: string | null;
  createdAt: string;
}

export interface User {
  users: string[];
}
