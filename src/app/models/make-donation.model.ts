import { BaseModel, ModelProperty } from "ts-json-mapper";

export class MakeDonationModel extends BaseModel {
    @ModelProperty()
    public status: boolean;

    @ModelProperty()
    public transactionId?: string;

    @ModelProperty()
    public errorMessage?: string;
}
