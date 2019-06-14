import { BaseModel, ModelProperty } from "ts-json-mapper";

export class CurrentSubscriptionModel extends BaseModel {
    @ModelProperty()
    public status: string;

    @ModelProperty()
    public id: string;

    @ModelProperty()
    public name: string;

    @ModelProperty()
    public currency: string;

    @ModelProperty()
    public interval: string;

    @ModelProperty()
    public price: number;

    @ModelProperty()
    public subscriptionID: string;
}
