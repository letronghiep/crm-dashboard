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
      name: 'Dashboard',
      routerLink: ['/dashboard'],
    },
    {
      icon: 'pi pi-fw pi-users',
      name: 'Employees',
      routerLink: ['/employees'],
    },
    {
      icon: 'pi pi-building',
      name: 'CRM',
      routerLink: ['/companies'],
      children: [
        {
          icon: 'pi pi-building',
          name: 'Companies',
          routerLink: ['/companies'],
        },
        {
          icon: 'pi pi-users',
          name: 'Contacts',
          routerLink: ['/contacts'],
        },
        {
          icon: 'pi pi-briefcase',
          name: 'Deals',
          routerLink: ['/deals'],
        },
      ],
    },
    {
      icon: 'pi pi-fw pi-clone',
      name: 'Projects',
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
