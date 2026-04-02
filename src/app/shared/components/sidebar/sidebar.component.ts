import { Component, Input } from '@angular/core';

interface MenuItem {
  icon: string;
  name: string;
  routerLink: string[];
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Input() isDarkMode = false;

  openMenus: Set<string> = new Set();

  menuItems: MenuItem[] = [
    {
      icon: 'pi pi-fw pi-home',
      name: 'sidebar.dashboard',
      routerLink: ['/dashboard'],
    },
    {
      icon: 'pi pi-fw pi-users',
      name: 'sidebar.employees',
      routerLink: ['/employees'],
    },
    {
      icon: 'pi pi-building',
      name: 'sidebar.crm',
      routerLink: ['/companies'],
      children: [
        {
          icon: 'pi pi-building',
          name: 'sidebar.companies',
          routerLink: ['/companies'],
        },
        {
          icon: 'pi pi-users',
          name: 'sidebar.contacts',
          routerLink: ['/contacts'],
        },
        {
          icon: 'pi pi-briefcase',
          name: 'sidebar.deals',
          routerLink: ['/deals'],
        },
      ],
    },
    {
      icon: 'pi pi-fw pi-clone',
      name: 'sidebar.projects',
      routerLink: ['/projects'],
    },
  ];

  toggleMenu(name: string): void {
    if (this.openMenus.has(name)) {
      this.openMenus.delete(name);
    } else {
      this.openMenus.add(name);
    }
  }

  isOpen(name: string): boolean {
    return this.openMenus.has(name);
  }
}
