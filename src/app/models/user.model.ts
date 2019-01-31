import { BaseModel, ModelProperty } from 'ts-json-mapper';

export class UserModel extends BaseModel {
    @ModelProperty()
    public id: number;

    @ModelProperty()
    public idNetwork: any;

    @ModelProperty()
    public createdAt: Date;

    @ModelProperty()
    public updatedAt: Date;

    @ModelProperty()
    public email:string;

    @ModelProperty()
    public displayName: string;

    @ModelProperty()
    public avatar: string;

    @ModelProperty()
    public currentToken: string;

    constructor (options: any) {
        super(options);
    }
}
