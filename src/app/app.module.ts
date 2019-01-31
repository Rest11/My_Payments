import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { APP_ROUTES } from './app.routes';
import { UnauthorizedLayoutComponent } from './layouts/unauthorized-layout/unauthorized-layout.component';
import { InterceptorsModule }  from './interceptors/interceptors.module';
import { GuardsModule } from './guards/guards.module';
import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';
import { ServicesModule } from './services/services.module';
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AuthServiceConfig, SocialLoginModule } from "angularx-social-login";
import { AppAuthService } from "./services/app-auth.service";

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ToastrModule.forRoot(),
        MatNativeDateModule,
        ComponentsModule,
        InterceptorsModule,
        GuardsModule,
        ServicesModule,
        PipesModule,
        DirectivesModule,
        SocialLoginModule,
        RouterModule.forRoot(APP_ROUTES),
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        UnauthorizedLayoutComponent,
        NotFoundComponent,
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: AppAuthService.provideConfig,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
