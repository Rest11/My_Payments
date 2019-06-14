import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
// noinspection TsLint
import PerfectScrollbar from 'perfect-scrollbar';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from "../../services/loader.service";

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

    @ViewChild('wrapper')
    private wrapper: ElementRef;

    private readonly BLURRED_CLASS: string = 'blurred';

    constructor (
        public readonly location: Location,
        private readonly router: Router,
        private readonly loaderService: LoaderService,
        private readonly renderer: Renderer2,
    ) { }

    public ngOnInit (): void {
        const isWindows: boolean = navigator.platform.indexOf('Win') > -1;

        if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
            // if we are on windows OS we activate the perfectScrollbar function
            document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
        } else {
            document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
        }
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                if (event.url !== this.lastPoppedUrl) {
                    this.yScrollStack.push(window.scrollY);
                }
            } else if (event instanceof NavigationEnd) {
                if (event.url === this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else {
                    window.scrollTo(0, 0);
                }
            }
        });

        this._router = this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
                elemMainPanel.scrollTop = 0;
                elemSidebar.scrollTop = 0;
            });

        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        }
    }

    public ngAfterViewInit () : void {
        this.runOnRouteChange();

        this.loaderService.isLoaderShown.subscribe((isLoaderShown: boolean) => {
            (isLoaderShown)
                ? this.renderer.addClass(this.wrapper.nativeElement, this.BLURRED_CLASS)
                : this.renderer.removeClass(this.wrapper.nativeElement, this.BLURRED_CLASS);
        });
    }

    public runOnRouteChange () : void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
            const ps = new PerfectScrollbar(elemMainPanel);
            ps.update();
        }
    }

    // noinspection JSMethodCanBeStatic
    public isMac () : boolean {
        return navigator.platform.toUpperCase().indexOf('MAC') >= 0
            || navigator.platform.toUpperCase().indexOf('IPAD') >= 0;
    }
}
