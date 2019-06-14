import { PaymentsSumGraphDataModel } from "../../models/payments-sum-graph-data.model";
import { PaymentsAmountGraphDataModel } from "../../models/payments-amount-graph-data.model";
import { UsersAmountGraphDataModel } from "../../models/users-amount-graph-data.model";

export interface PaymentsGraphData {
    sum: PaymentsSumGraphDataModel[];
    amount: PaymentsAmountGraphDataModel[];
    usersAmount: UsersAmountGraphDataModel[];
}
