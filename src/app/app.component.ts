import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoaderService } from './services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor (
        private readonly router: Router,
        private readonly loaderService: LoaderService,
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.loaderService.start();
            }
            if ((event instanceof NavigationEnd) ||
                (event instanceof NavigationCancel) ||
                (event instanceof NavigationError)
            ) {
                this.loaderService.stop();
            }
        });
    }
}
