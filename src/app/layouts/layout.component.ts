import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  isDarkMode$!: Observable<boolean>;
  isSidebarCollapsed$!: Observable<boolean>;

  constructor(private themeService: ThemeService) {
    this.isDarkMode$ = this.themeService.isDarkMode$;
    this.isSidebarCollapsed$ = this.themeService.isSidebarCollapsed$;
  }
}
