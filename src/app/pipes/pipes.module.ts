import { NgModule } from '@angular/core';
import { PrettyDatePipe } from "./pretty-date.pipe";

@NgModule({
    imports: [],
    declarations: [
        PrettyDatePipe,
    ],
    exports: [
        PrettyDatePipe,
    ],
})
export class PipesModule {
    static forRoot () {
        return {
            ngModule: PipesModule,
            providers: [],
        };
    }
}
