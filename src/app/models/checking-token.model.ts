import { BaseModel, ModelProperty } from "ts-json-mapper";

export class CheckingTokenModel extends BaseModel {
    @ModelProperty()
    isAuthenticated: boolean;
}
