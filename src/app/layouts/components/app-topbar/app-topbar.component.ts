import { Component } from '@angular/core';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.css'],
})
export class AppTopbarComponent {

  constructor(private themeService: ThemeService) {}

  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const themeName = this.isDarkMode ? 'theme-dark' : 'theme-light';
    this.themeService.switchTheme(themeName);
  }
}
