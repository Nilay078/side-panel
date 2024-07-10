import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { SideBarMenuList } from './side-menu';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-latest-version';
  @ViewChild('sidenav') sidenav?: MatSidenav;
  @Output() isExpandedFlag = new EventEmitter();
  @Output() showResponsiveFlag = new EventEmitter();

  isExpanded = true;
  showSubmenu = false;
  showResponsive = false;
  showSubSubMenu = false;
  currentUrl!: string;

  menuList: any[] = [];

  constructor(
      private breakpointObserver: BreakpointObserver,
      private router: Router
  ) {}

  ngOnInit(): void {
      this.breakpointObserver.observe(['(min-width: 0px) and (max-width: 767px)']).subscribe((result: BreakpointState) => {
          if (result.matches) {
              this.isExpanded = true;
          }
      });
      this.breakpointObserver.observe(['(min-width: 768px) and (max-width: 991px)']).subscribe((result: BreakpointState) => {
          if (result.matches) {
              this.isExpanded = false;
          }
      });
      this.breakpointObserver.observe(['(min-width: 992px)']).subscribe((result: BreakpointState) => {
          if (result.matches) {
              this.isExpanded = true;
              this.showResponsive = true;
          }
      });
      this.menuList = SideBarMenuList as any[];
      const routerList = this.router.url.split('/');
      if (routerList.length > 2) {
          this.activeParentMenu(routerList[1], routerList[1] + '/' + routerList[2]);
      } else {
          this.activeParentMenu(this.router.url.split('/')[1]);
      }
  }

  activeParentMenu(activeMenu: string, submenu?: string) {
      this.menuList.forEach((menuData: any) => {
          if (menuData.routerLink === activeMenu) {
              menuData.active = true;
          } else {
              menuData.active = false;
          }
          if (menuData.children) {
              menuData.children.forEach((element: any) => {
                  if (element.routerLink === submenu) {
                      element.active = true;
                  } else {
                      element.active = false;
                  }
              });
          }
      });
  }

  openMenu(menu: any, submenu?: any) {
      this.activeParentMenu(menu.routerLink, submenu?.routerLink);
      this.breakpointObserver.observe(['(min-width: 0) and (max-width: 767px)']).subscribe((result: BreakpointState) => {
          if (result.matches) {
              this.isExpanded = true;
          }
      });
  }

  mouseenter() {
      this.breakpointObserver.observe(['(min-width: 0) and (max-width: 767px)']).subscribe((result: BreakpointState) => {
          if (result.matches) {
              this.isExpanded = false;
          }
      });
      this.breakpointObserver.observe(['(min-width: 768px) and (max-width: 991px)']).subscribe((result: BreakpointState) => {
          if (result.matches) {
              this.isExpanded = true;
          }
      });
      this.breakpointObserver.observe(['(min-width: 992px)']).subscribe((result: BreakpointState) => {
          if (result.matches) {
              this.isExpanded = true;
          }
      });
  }

  mouseleave() {
      this.breakpointObserver.observe(['(min-width: 0) and (max-width: 767px)']).subscribe((result: BreakpointState) => {
          if (result.matches && !this.showResponsive) {
              this.isExpanded = false;
          }
      });
      this.breakpointObserver.observe(['(min-width: 768px) and (max-width: 991px)']).subscribe((result: BreakpointState) => {
          if (result.matches && !this.showResponsive) {
              this.isExpanded = false;
          }
      });
      this.breakpointObserver.observe(['(min-width: 992px)']).subscribe((result: BreakpointState) => {
          if (result.matches && !this.showResponsive) {
              this.isExpanded = false;
          }
      });
  }

  responsiveFlag(event: boolean) {
      this.showResponsive = event;
  }

  expandedFlag(event: boolean) {
      this.isExpanded = event;
  }
}
