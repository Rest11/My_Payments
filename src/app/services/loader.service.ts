import { ApplicationRef, ComponentRef, Injectable } from '@angular/core';
import { InjectionService } from './injection.service';
import { LoaderComponent } from '../components/loader/loader.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, first, map, mergeMap, share, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { CustomStyle } from "../types/custom-style";

@Injectable()
export class LoaderService {
    private loader: ComponentRef<LoaderComponent>;
    private readonly loadingProcesses: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    public readonly isLoaderShown: Observable<boolean>;

    constructor (
        private readonly injectionService: InjectionService,
        private readonly application: ApplicationRef,
    ) {
        this.isLoaderShown = this.application.isStable
            .pipe(
                filter((isStable) => isStable),
                first(),
                tap(() => { this.loader = this.injectionService.appendComponent(LoaderComponent); }),
                mergeMap(() => this.loadingProcesses),
                map((loadingProcessesCount) => loadingProcessesCount > 0),
                share(),
            );

        this.isLoaderShown
            .subscribe((isLoaderShown) => {
                (isLoaderShown)
                    ? this.loader.instance.show()
                    : this.loader.instance.hide();
            });
    }

    public start () : void {
        this.loadingProcesses.next(this.loadingProcesses.value + 1);
    }

    public stop () : void {
        this.loadingProcesses.next(this.loadingProcesses.value - 1);
    }

    public setCustomStyles (styles: CustomStyle[]): void {
        this.loader.instance.setCustomStyles(styles);
    }

    public removeCustomStyles (styles: CustomStyle[]): void {
        this.loader.instance.removeCustomStyles(styles);
    }
}
