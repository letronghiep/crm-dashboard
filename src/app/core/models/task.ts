export interface Task {
  id: number;
  title: string;
  assignee?: number;
  estimateTime?: number;
  spentTime?: number;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  createdAt: Date;
}
