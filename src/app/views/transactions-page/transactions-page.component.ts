import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { PaymentModel } from "../../models/payment.model";
import { CollectionDto } from "../../services/types/collection.dto";
import { DataTableComponent } from "../../classes/data-table/data-table.component";
import { DataTableField } from "../../classes/data-table/types/data-table-field";
import { DataTableAction } from "../../classes/data-table/types/data-table-action";
import { TransactionService } from "../../services/transaction.service";

@Component({
    selector: 'transactions-page',
    templateUrl: './transactions-page.component.html',
    styleUrls: ['./transactions-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsPageComponent {
    @ViewChild('dataTable')
    private dataTable: DataTableComponent<PaymentModel, CollectionDto>;

    public requestsGetter = this.transactionService.getTransactions.bind(this.transactionService);

    public fieldsList: DataTableField[] = [
        {
            entityFieldName: 'createdAt',
            columnName: 'Date',
        },
        {
            entityFieldName: 'transactionId',
            columnName: 'Transaction ID',
        },
        {
            entityFieldName: 'currency',
            columnName: 'Currency',
        },
        {
            entityFieldName: 'amount',
            columnName: 'Amount',
        },
        {
            entityFieldName: 'description',
            columnName: 'Description',
        },
        {
            entityFieldName: 'status',
            columnName: 'Status',
        },
        {
            entityFieldName: 'errorMessage',
            columnName: 'Error',
        },
    ];

    public actionsList: DataTableAction<PaymentModel>[] = [];

    constructor (
        private readonly transactionService: TransactionService,
    ) {}
}
