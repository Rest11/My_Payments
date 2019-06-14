import { BaseModel, ModelProperty } from "ts-json-mapper";

export class SubscriptionPlansModel extends BaseModel {
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
}
