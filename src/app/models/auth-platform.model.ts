import { BaseModel, ModelProperty } from "ts-json-mapper";

export class AuthPlatformModel extends BaseModel {
    @ModelProperty()
    public authPlatform: string;
}
