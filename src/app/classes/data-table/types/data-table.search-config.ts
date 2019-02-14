import { Params } from "@angular/router";

export interface DataTableSearchConfig {
    useSearch: boolean;
    searchUrl: string;
    searchQueryParam: string;
    additionalParams?: Params;
    responseMapper?: Function;
    templateMapper?: Function;
}
