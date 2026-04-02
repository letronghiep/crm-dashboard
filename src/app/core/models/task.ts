import { IAttachment } from './project';

export interface Task {
  id: number;
  taskType: 'task' | 'bug' | 'feature';
  title: string;
  assignee?: number;
  estimateTime?: number;
  description?: string;
  spentTime?: number;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  activities?: string[];
  attachments: IAttachment[];
  isActive: boolean;
  createdAt: Date;
}
