import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { filter, map, pluck } from "rxjs/operators";
import { CssClasses } from '../../enums/css-classes.enum';
import { AppAuthService } from "../../services/app-auth.service";
import { RoutingContract } from "../../contracts/routing.contract";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
    public currentAvatarLink: Observable<string>;
    public readonly RoutingContract: typeof RoutingContract = RoutingContract;

    @ViewChild('navbarToggler')
    private navbarToggler: ElementRef;

    private body: HTMLElement;
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
    }

    private openSidebar (): void {

        // this.renderer.addClass(this.body, CssClasses.NAV_OPEN);
        // this.renderer.addClass(this.navbarToggler.nativeElement, CssClasses.TOGGLED);
        this.isSidebarVisible = true;
    }

    private closeSidebar () {
        /**
         * TODO: investigate: one of these caused random error to appear
         * TypeError: Cannot read property 'classList' of undefined at EmulatedEncapsulationDomRenderer2.DefaultDomRenderer2.removeClass
         */

        // this.renderer.removeClass(this.body, CssClasses.NAV_OPEN);
        // this.renderer.removeClass(this.navbarToggler.nativeElement, CssClasses.TOGGLED);

        this.isSidebarVisible = false;
    }

    public toggleSidebar (): void {
        (this.isSidebarVisible)
            ? this.closeSidebar()
            : this.openSidebar();
    }
}
