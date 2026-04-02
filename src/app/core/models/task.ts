import { IAttachment } from './project';

export interface Task {
  id: number;
  taskType: 'task' | 'bug' | 'feature';
  parentTask: number;
  title: string;
  assignee?: number;
  estimateTime?: number;
  description?: string;
  spentTime?: number;
  startDate?: Date;
  endDate?: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  activities?: string[];
  attachments: IAttachment[];
  isActive: boolean;
  createdAt: Date;
}
