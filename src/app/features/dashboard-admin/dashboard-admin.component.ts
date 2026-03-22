import { Component, OnDestroy } from '@angular/core';
import { ThemeService } from '../../layouts/theme.service';
import {
  catchError,
  map,
  Observable,
  of,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';
import { DashboardAdminService } from 'src/app/core/services/dashoard-admin/dashboard-admin.service';
import { IAdminData } from 'src/app/core/models/data.interface';
import { Project } from 'src/app/core/models/project';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent implements OnDestroy {
  name: string = 'Hiep';
  isDarkMode$!: Observable<boolean>;
  adminData$!: Observable<DashboardState>;
  projects$!: Observable<Project[]>;
  dateForm: FormGroup;
  private readonly destroys$ = new Subject<void>();
  constructor(
    private themeService: ThemeService,
    private dashboardService: DashboardAdminService,
    private fb: FormBuilder,
  ) {
    this.dateForm = this.fb.group({
      startDate: [new Date()],
      endDate: [new Date()],
    });
    this.isDarkMode$ = this.themeService.isDarkMode$;
    this.adminData$ = this.dashboardService.dashboardOverview().pipe(
      takeUntil(this.destroys$),
      map((res) => ({
        loading: false,
        data: {
          workload: res.contents.workload,
          projects: res.contents.projects,
        },
      })),
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

    this.projects$ = this.adminData$.pipe(map((d) => d.data?.projects ?? []));
  }

  ngOnDestroy(): void {
    this.destroys$.next();
    this.destroys$.complete();
  }
}
type DashboardState = {
  loading: boolean;
  data: IAdminData | null;
};
