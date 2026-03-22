import { Component } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';
import { Event } from 'src/app/core/models/event.interface';
import { DashboardAdminService } from 'src/app/core/services/dashoard-admin/dashboard-admin.service';
import { ThemeService } from 'src/app/layouts/theme.service';

@Component({
  selector: 'app-nearest-event',
  templateUrl: './nearest-event.component.html',
  styleUrls: ['./nearest-event.component.css'],
})
export class NearestEventComponent {
  private readonly destroy$ = new Subject<void>();
  eventsState$: Observable<EventState>;
  events$: Observable<Event[] | null>;
  themeService: ThemeService;
  constructor(private dashboardService: DashboardAdminService, themeService: ThemeService) {
    this.themeService = themeService;
    this.eventsState$ = this.dashboardService.getNearestEvent().pipe(
      takeUntil(this.destroy$),
      map((res) => {
        return {
          loading: false,
          data: res.contents,
        };
      }),
      catchError(() =>
        of({
          loading: false,
          data: null,
        }),
      ),
      startWith({
        loading: true,
        data: null,
      }),
    );
    this.events$ = this.eventsState$.pipe(map((d) => d.data));
    console.log(this.events$)
    // this.events$ = this.eventsState$.pipe(map((d) => d.data ?? []));
  }
  getClasses(priority?: string) {
    switch (priority) {
      case 'LOW':
        return '[#0AC947]';
      case 'MEDIUM':
        return '[#FFBD21]';
      case 'HIGH':
        return 'red-600';
      default:
        return '';
    }
  }
  getRelativeLabel(date: Date | string): string {
    const d = new Date(date);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
    let label = '';
  
    if (diffDays === 0) {
      label = 'Today';
    } else if (diffDays === 1) {
      label = 'Tomorrow';
    } else if (diffDays === -1) {
      label = 'Yesterday';
    } else if (diffDays > 1) {
      label = `In ${diffDays} days`;
    } else {
      label = `${Math.abs(diffDays)} days ago`;
    }
  
    const time = d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  
    return `${label} | ${time}`;
  }
  getDuration(start: Date | string, end: Date | string): string {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
  
    const diffMs = endTime - startTime;
  
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
    if (hours && minutes) return `${hours}h ${minutes}m`;
    if (hours) return `${hours}h`;
    return `${minutes}m`;
  }
}
type EventState = {
  loading: boolean;
  data: Event[] | null;
};
