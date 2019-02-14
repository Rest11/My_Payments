import { BaseModel, ModelProperty } from "ts-json-mapper";

export class TokenModel extends BaseModel {
    @ModelProperty()
    public currentToken: string;
}
