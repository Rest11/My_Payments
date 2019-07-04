import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { filter, map, pluck } from "rxjs/operators";
import { CssClasses } from '../../enums/css-classes.enum';
import { AppAuthService } from "../../services/app-auth.service";
import { RoutingContract } from "../../contracts/routing.contract";
import { ID_NAVBAR_TOGGLE } from "../../app.constants";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
    public readonly routingContract: typeof RoutingContract = RoutingContract;
    public readonly idNavbarToggle: typeof ID_NAVBAR_TOGGLE = ID_NAVBAR_TOGGLE;

    public currentAvatarLink: Observable<string>;

    private body: HTMLElement;
    private navbarToggle: HTMLElement;
    private isSidebarVisible: boolean = false;

    constructor (
        private readonly router: Router,
        private readonly renderer: Renderer2,
        private readonly usersService: AppAuthService,
    ) { }

    public ngOnInit (): void {
        this.router.events.subscribe(() => {
            this.closeSidebar();
        });

        this.currentAvatarLink = this.usersService.userSubject
            .pipe(
                filter((user) => !!user),
                pluck('avatar'),
                map((link: string) => link || '/assets/img/user-placeholder.png'),
            );
    }

    public ngAfterViewInit (): void {
        this.body = document.body;
        this.navbarToggle = document.getElementById(this.idNavbarToggle);
    }

    private openSidebar (): void {
        this.renderer.addClass(this.body, CssClasses.NAV_OPEN);
        this.renderer.addClass(this.navbarToggle, CssClasses.TOGGLED);
        this.isSidebarVisible = true;
    }

    private closeSidebar () {
        this.renderer.removeClass(this.body, CssClasses.NAV_OPEN);
        this.renderer.removeClass(this.navbarToggle, CssClasses.TOGGLED);

        this.isSidebarVisible = false;
    }

    public toggleSidebar (): void {
        this.isSidebarVisible
            ? this.closeSidebar()
            : this.openSidebar();
    }
}
