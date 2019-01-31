import { NgModule } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { AppAuthService } from './app-auth.service';
import { InjectionService } from './injection.service';
import { LoaderService } from './loader.service';

@NgModule({
    providers: [
        NotificationsService,
        AppAuthService,
        InjectionService,
        LoaderService,
    ],
})
export class ServicesModule { }
