import { BaseModel, ModelProperty } from "ts-json-mapper";

export class PaymentModel extends BaseModel {
    @ModelProperty()
    public createdAt: Date;

    @ModelProperty()
    public transactionId: string;

    @ModelProperty()
    public currency: string;

    @ModelProperty()
    public amount: number;

    @ModelProperty()
    public description: string;

    @ModelProperty()
    public status: boolean;

    @ModelProperty()
    public errorMessage: string;
}
