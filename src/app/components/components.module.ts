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
import { DonationComponent } from "./donation/donation.component";
import { GraphComponent } from "./graph/graph.component";

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
        DonationComponent,
        GraphComponent,
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        TransparentBordersComponent,
        DonationComponent,
        GraphComponent,
    ],
    entryComponents: [
        LoaderComponent,
    ],
})
export class ComponentsModule { }
