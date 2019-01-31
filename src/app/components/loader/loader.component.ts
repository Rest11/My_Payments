import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CustomStyle } from "../../types/custom-style";

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
    @ViewChild('spinner')
    private spinner: ElementRef;

    private readonly HIDDEN_CLASS: string = 'hidden';

    constructor (
        private readonly renderer: Renderer2,
    ) { }

    public show () : void {
        this.renderer.removeClass(this.spinner.nativeElement, this.HIDDEN_CLASS);
    }

    public hide () : void {
        this.renderer.addClass(this.spinner.nativeElement, this.HIDDEN_CLASS);
    }

    public setCustomStyles (styles: CustomStyle[]): void {
        for (let style of styles) {
            this.renderer.setStyle(this.spinner.nativeElement, style.property, style.value);
        }
    }

    public removeCustomStyles (styles: CustomStyle[]): void {
        for (let style of styles) {
            this.renderer.removeStyle(this.spinner.nativeElement, style.property);
        }
    }
}
