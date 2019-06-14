import { BaseModel } from "ts-json-mapper";

export interface GraphData {
    graphId: string;
    tableName: string;
    data: BaseModel[];
}
