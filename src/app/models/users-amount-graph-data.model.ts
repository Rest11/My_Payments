import { BaseModel, ModelProperty } from "ts-json-mapper";

export class UsersAmountGraphDataModel extends BaseModel {
    @ModelProperty()
    public date: Date;

    @ModelProperty('usersAmount')
    public value: number;
}
