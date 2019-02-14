import { BaseModel, ModelProperty } from "ts-json-mapper";

export class PaymentsSumGraphDataModel extends BaseModel {
    @ModelProperty()
    public date: Date;

    @ModelProperty('paymentsSum')
    public value: number;
}
