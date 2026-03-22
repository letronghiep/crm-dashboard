import { Task } from './task';

export interface Project {
  id: number;
  name: string;
  project_number: string;
  description: string;
  reporter: number;
  assignees: number[];
  priority: 'low' | 'medium' | 'high';
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
  attachments: IAttachment[];
  activeTasks: Task[];
  backlogTasks: Task[];
  users?: string[];
}
export interface IAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedBy: number;
  createdAt: Date;
}
