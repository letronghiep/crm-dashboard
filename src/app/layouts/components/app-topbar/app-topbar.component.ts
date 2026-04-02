import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../theme.service';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/translate.service';

@Component({
  selector: 'app-app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.css'],
})
export class AppTopbarComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private translate: TranslateService,
    private languageService: LanguageService,
  ) {
    // translate.setDefaultLang('vi');
  }
  locales: MenuItem[] = [];
  isDarkMode = false;
  ngOnInit(): void {
    this.locales = [
      {
        items: [
          {
            label: 'Vietnamese',
            title: 'vi',
            command: (event) => {
              const value = event.item?.title;
              if (!value) {
                this.languageService.switchLanguage('vi');
              } else {
                this.languageService.switchLanguage(value);
              }
            },
          },
          {
            label: 'English',
            title: 'en',
            command: (event) => {
              const value = event.item?.title;
              if (!value) {
                this.languageService.switchLanguage('vi');
              } else {
                this.languageService.switchLanguage(value);
              }
            },
          },
        ],
      },
    ];
  }

  onMenuClick() {
    this.themeService.toggleSidebar();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
  switchLanguage(lang: string) {
    this.languageService.switchLanguage(lang);
  }
}
