import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatTooltipModule } from '@angular/material';
import { NgxTypeaheadModule } from "cr-ngx-typeahead";
import { DataTableComponent } from './data-table.component';

@NgModule({
    imports: [
        CommonModule,
        MatPaginatorModule,
        MatTooltipModule,
        NgxTypeaheadModule,
    ],
    declarations: [
        DataTableComponent,
    ],
    exports: [
        DataTableComponent,
    ],
})
export class DataTableModule { }
