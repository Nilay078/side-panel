import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MaterialModule } from '../material.module';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [MaterialModule]
})
export class HeaderComponent {
    @Input() showResponsive!: boolean;
    @Input() isExpanded!: boolean;
    @Output() responsiveFlag = new EventEmitter();
    @Output() expandedFlag = new EventEmitter();
    isOpen = false;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
    ) {}

    sideNav() {
        this.breakpointObserver.observe(['(min-width: 0) and (max-width: 767px)']).subscribe((result: BreakpointState) => {
            if (result.matches) {
                this.showResponsive = true;
            }
        });
        this.breakpointObserver.observe(['(min-width: 768px) and (max-width: 991px)']).subscribe((result: BreakpointState) => {
            if (result.matches && !this.isExpanded) {
                this.showResponsive = true;
            }
            if (result.matches && this.isExpanded) {
                this.showResponsive = false;
            }
        });
        this.breakpointObserver.observe(['(min-width: 992px)']).subscribe((result: BreakpointState) => {
            if (result.matches && !this.isExpanded) {
                this.showResponsive = true;
            }
            if (result.matches && this.isExpanded) {
                this.showResponsive = false;
            }
        });
        this.isExpanded = !this.isExpanded;
        this.responsiveFlag.emit(this.showResponsive);
        this.expandedFlag.emit(this.isExpanded);
    }

    onLogout() {
        console.log("logout");
    }

    gotoDashboard() {
        console.log("go to dashboard");
    }

    changePassword() {
        console.log("changepassword");
    }
}
