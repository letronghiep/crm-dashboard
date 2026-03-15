import { Component } from '@angular/core';
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
  menuItems: MenuItem[] = [
    {
      icon: 'pi pi-fw pi-home',
      name: 'Dashboard',
      routerLink: ['/'],
    },
  ];
}
