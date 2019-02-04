import { BaseModel, ModelProperty } from 'ts-json-mapper';

export class UserModel extends BaseModel {
    @ModelProperty()
    public id: number;

    @ModelProperty()
    public createdAt: Date;

    @ModelProperty()
    public updatedAt: Date;

    @ModelProperty()
    public externalId: string;

    @ModelProperty()
    public email:string;

    @ModelProperty()
    public name: string;

    @ModelProperty()
    public avatar: string;
}
