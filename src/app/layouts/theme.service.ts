import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _isDarkMode$ = new BehaviorSubject<boolean>(false);
  private _isSidebarCollapsed$ = new BehaviorSubject<boolean>(false);

  isDarkMode$ = this._isDarkMode$.asObservable();
  isSidebarCollapsed$ = this._isSidebarCollapsed$.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  setDarkMode(isDark: boolean) {
    this._isDarkMode$.next(isDark);
    const themeName = isDark ? 'theme-dark' : 'theme-light';
    this.switchTheme(themeName);
  }
  isDarkMode() {
    return this._isDarkMode$.value;
  }
  setSidebarCollapsed(collapsed: boolean) {
    this._isSidebarCollapsed$.next(collapsed);
  }

  toggleSidebar() {
    this._isSidebarCollapsed$.next(!this._isSidebarCollapsed$.value);
  }

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById(
      'app-theme',
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = theme + '.css';
    }
  }
}
