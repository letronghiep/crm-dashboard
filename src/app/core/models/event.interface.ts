export interface Event {
  id: number;
  title: string;
  description?: string;

  startTime: Date;
  endTime: Date;
  allDay?: boolean;

  location?: string;
  meetingUrl?: string;

  type: 'MEETING' | 'CALL' | 'DEMO' | 'WEBINAR' | 'TASK';
  status: 'SCHEDULED' | 'ONGOING' | 'DONE' | 'CANCELLED';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';

  createdBy: string;
  assignedTo?: string;

  companyId?: string;
  contactIds?: string[];
  dealId?: string;
  projectId?: string;

  reminders?: {
    type: 'EMAIL' | 'NOTIFICATION';
    time: number;
    unit: string;
  }[];

  isRecurring?: boolean;
  recurrenceRule?: {
    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
    interval: number;
    endDate?: Date;
  };

  attachments?: string[];
  tags?: string[];
  color?: string;

  createdAt: Date;
  updatedAt: Date;
}
