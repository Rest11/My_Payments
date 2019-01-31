import { NgModule } from '@angular/core';

@NgModule({
    imports: [],
    declarations: [
    ],
    exports: [
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
