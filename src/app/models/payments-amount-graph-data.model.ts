import { BaseModel, ModelProperty } from "ts-json-mapper";

export class PaymentsAmountGraphDataModel extends BaseModel {
    @ModelProperty()
    public date: Date;

    @ModelProperty('paymentsAmount')
    public value: number;
}
