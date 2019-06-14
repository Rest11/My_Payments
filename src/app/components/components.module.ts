import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';
import { TransparentBordersComponent } from './transparent-borders/transparent-borders.component';
import { GraphComponent } from "./graph/graph.component";
import { StripeCardComponent } from './stripe-card/stripe-card.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        LoaderComponent,
        TransparentBordersComponent,
        GraphComponent,
        StripeCardComponent,
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        TransparentBordersComponent,
        GraphComponent,
        StripeCardComponent,
    ],
    entryComponents: [
        LoaderComponent,
    ],
})
export class ComponentsModule { }
