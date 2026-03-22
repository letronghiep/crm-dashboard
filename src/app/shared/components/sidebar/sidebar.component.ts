import { Component, Input } from '@angular/core';
interface MenuItem {
  icon: string;
  name: string;
  routerLink: string[];
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Input() isDarkMode = false;
  menuItems: MenuItem[] = [
    {
      icon: 'pi pi-fw pi-home',
      name: 'Dashboard',
      routerLink: ['/dashboard'],
    },
    {
      icon: 'pi pi-fw pi-users',
      name: 'Employees',
      routerLink: ['/employees'],
    },
    {
      icon: 'pi pi-fw pi-clone',
      name: 'Projects',
      routerLink: ['/projects'],
    },
  ];
}
