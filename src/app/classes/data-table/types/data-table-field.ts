import { CustomTemplateFactory } from "../../../types/custom-template.factory";

export interface DataTableField {
    readonly entityFieldName: string;
    readonly columnName?: string;
    readonly sortAlias?: string;
    readonly customTemplateFactory?: CustomTemplateFactory;
}
