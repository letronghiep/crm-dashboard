import { Employee } from './employee';
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
  users?: number[];
}

export interface ProjectWithAssignee extends Omit<
  Project,
  'assignees' | 'users'
> {
  assignees: number[];
  userInProject?: Employee[];
}
export interface IAttachment {
  id: string;
  name: string;
  serverPath: string;
  type: string;
  size: number;
  uploadedBy: number;
  createdAt: Date;
}
