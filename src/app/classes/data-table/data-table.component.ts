import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CollectionResponse } from '../../types/collection.response';
import { SubscriptionsContract } from '../../contracts/subscriptions.contract';
import { CollectionDto } from '../../services/types/collection.dto';
import { DataTableField } from './types/data-table-field';
import { DataTableAction } from './types/data-table-action';
import { CustomTemplateFactory } from '../../types/custom-template.factory';
import { CustomTemplateDescriptor } from '../../types/custom-template.descriptor';
import { DataTableSearchConfig } from "./types/data-table.search-config";
import { CommonComponent } from "../common-component";

@Component({
    selector: 'data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<DataInstance, RequestDto extends CollectionDto>
extends CommonComponent implements OnInit {
    public readonly META_KEYS = {
        COMPONENT: '__component',
        MODULE: '__module',
    };

    @Input()
    public tableName: string = 'Data table';
    @Input()
    public tableDescription: string = 'Common approach for displaying, sorting and filtering data';
    @Input()
    public dataGetter: (dto: RequestDto) => Observable<CollectionResponse<DataInstance>>;
    @Input()
    public dtoTransform: (innerDto: CollectionDto) => RequestDto;
    @Input()
    public fieldsList: DataTableField[] = [];
    @Input()
    public actionsList: DataTableAction<DataInstance>[] = [];
    @Input()
    public searchConfig: DataTableSearchConfig;

    @Output()
    public onSearchResultSelected: EventEmitter<DataInstance> = new EventEmitter<DataInstance>();

    public readonly ITEMS_PER_PAGE_OPTIONS: number[] = [10, 20, 50];
    public currentDataPortion: BehaviorSubject<DataInstance[]> = new BehaviorSubject<DataInstance[]>(([]));
    public currentPage: BehaviorSubject<number> = new BehaviorSubject<number>((0));
    public itemsPerPage: BehaviorSubject<number> = new BehaviorSubject<number>(this.ITEMS_PER_PAGE_OPTIONS[0]);
    public totalItemsCount: BehaviorSubject<number> = new BehaviorSubject<number>((0));

    constructor () {
        super();
    }

    public ngOnInit () : void {
        this.updateDataPortion();
    }

    private getInnerDto () : CollectionDto {
        return {
            limit: this.itemsPerPage.value,
            offset: this.itemsPerPage.value * this.currentPage.value,
        };
    }

    public updateDataPortion () {
        if (!this.dataGetter) {
            const message: string = 'Data getter is not set!';
            throw new Error(message);
        }

        const innerDto: CollectionDto = this.getInnerDto();
        const dataGetterDto: RequestDto = (this.dtoTransform)
            ? this.dtoTransform(innerDto)
            : innerDto as RequestDto;

        this.updateSubscription(
            SubscriptionsContract.DataTable.UPDATE_DATA_PORTION,
            this.dataGetter(dataGetterDto).subscribe(
                this.handleGetDataSuccess.bind(this),
                this.handleGetDataFailure.bind(this),
            ),
        );
    }

    private handleGetDataSuccess (response: CollectionResponse<DataInstance>) : void {
        const items: DataInstance[] = response.items
            .map((element) => {
                this.fieldsList
                    .filter((field) => !!field.customTemplateFactory)
                    .forEach((field) => {
                        const factory: CustomTemplateFactory = field.customTemplateFactory;
                        const descriptor: CustomTemplateDescriptor = factory.produce(element[field.entityFieldName]);

                        element[this.META_KEYS.COMPONENT] = descriptor.component;
                        element[this.META_KEYS.MODULE] = descriptor.module;
                    });
                return element;
            });
        this.currentDataPortion.next(items);
        this.totalItemsCount.next(response.total);
    }

    // noinspection JSMethodCanBeStatic
    private handleGetDataFailure (res: any) : void {
        console.log(res);
    }

    public handleSearchResultSelected (result: DataInstance) : void {
        this.onSearchResultSelected.emit(result);
    }

    public handlePaginationUpdate (event: PageEvent) : void {
        this.itemsPerPage.next(event.pageSize);
        this.currentPage.next(event.pageIndex);
        this.updateDataPortion();
    }
}
