import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'payments-page',
    templateUrl: './payments-page.component.html',
    styleUrls: ['./payments-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsPageComponent {

}
