import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

/**
 * Component that displays half-transparent (gradient) borders around it's content.
 * Rules are the following:
 *  - top border is not shown if we are at the top of scrolling container;
 *  - bottom border is not shown if we are at the bottom of scrolling container;
 *  - if content's height is smaller that container's, no borders are shown at all.
 * IMPORTANT:
 *  - parent component should have explicitly set width/height and position:relative;
 *  - there should be exactly one child element.
 * @todo: turn this into a directive maybe?
 */
@Component({
    selector: 'transparent-borders',
    templateUrl: './transparent-borders.component.html',
    styleUrls: ['./transparent-borders.component.scss'],
})
export class TransparentBordersComponent implements AfterViewInit {
    // contents of this component
    @ViewChild('contents')
    private contents: ElementRef;

    // should we show top and bottom borders?
    protected showTopBorder: boolean = false;
    protected showBottomBorder: boolean = true;

    constructor () { }

    ngAfterViewInit () : void {
        const scrollableElement: HTMLElement = this.contents.nativeElement;

        // check if content goes outside of container
        // (assuming there is only one child element)
        if (scrollableElement.clientHeight > scrollableElement.children[0].clientHeight) {
            // if content if fit inside container, no borders are needed;
            // setTimeout required to avoid 'Expression has changed after it was checked' error
            setTimeout(() => {
                this.showTopBorder = false;
                this.showBottomBorder = false;
            });
            return;
        }

        // if content may be scrolled, listen to it's 'scroll' event
        scrollableElement.addEventListener('scroll', (event: Event) => {
            const srcElement: HTMLElement = event.srcElement as HTMLElement;

            // if we are at the top of container, hide top border
            this.showTopBorder = srcElement.scrollTop !== 0;

            // if we are at the bottom of container, hide bottom border
            this.showBottomBorder = srcElement.scrollTop !== srcElement.scrollHeight - srcElement.clientHeight;
        });
    }
}
