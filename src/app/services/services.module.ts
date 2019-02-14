import { NgModule } from '@angular/core';
import { AppAuthService } from './app-auth.service';
import { InjectionService } from './injection.service';
import { LoaderService } from './loader.service';
import { UserService } from "./user.service";
import { PaymentService } from "./payment.service";
import { TransactionService } from "./transaction.service";
import { DashboardService } from "./dashboard.service";

@NgModule({
    providers: [
        AppAuthService,
        InjectionService,
        LoaderService,
        UserService,
        PaymentService,
        TransactionService,
        DashboardService,
    ],
})
export class ServicesModule { }
