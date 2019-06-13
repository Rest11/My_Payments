import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Element as StripeElement, Elements, ElementsOptions, StripeService, Token, TokenResult } from "ngx-stripe";
import { filter, map } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { CommonComponent } from "../../classes/common-component";
import { SubscriptionsContract } from "../../contracts/subscriptions.contract";
import { Card } from "../../app.constants";

@Component({
    selector: 'stripe-card',
    templateUrl: './stripe-card.component.html',
    styleUrls: ['./stripe-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StripeCardComponent extends CommonComponent implements AfterViewInit {
    private readonly stripeCard: typeof Card.Stripe = Card.Stripe;
    private cardElement: StripeElement;

    @Input()
    private paymentErrorMessage: BehaviorSubject<string | null>;

    @Output()
    public hasError: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor (
        private readonly stripeService: StripeService,
    ) {
        super();
    }

    private cardChangesHandler (): void {
        this.cardElement.on('change', (event) => {
            if (event.error || event.empty) {
                this.hasError.emit(true);
                event.error
                    ? this.paymentErrorMessage.next(event.error.message)
                    : this.paymentErrorMessage.next(null);
                return;
            }

            this.paymentErrorMessage.next(null);
            this.hasError.emit(false);
        });
    }

    public ngAfterViewInit (): void {
        const paymentOptions: ElementsOptions = {
            locale: 'auto',
        };

        this.updateSubscription(
            SubscriptionsContract.Stripe.PAYMENT_CARD,
            this.stripeService.elements(paymentOptions).subscribe(
                (elements: Elements) => {
                    if (this.cardElement) return;

                    this.cardElement = elements.create('card', {
                        style: this.stripeCard.STYLES,
                    });
                    this.cardElement.mount(`#${this.stripeCard.ID_CARD_ELEMENT}`);
                    this.cardChangesHandler();
                },
            ),
        );
    }

    public getPaymentToken (): Observable<Token> {
        return this.stripeService.createToken(this.cardElement, undefined).pipe(
            map((result: TokenResult) => {
                if (result.error) {
                    this.hasError.emit(true);
                    return false;
                }

                this.hasError.emit(false);
                return result.token;
            }),
            filter((token: Token | boolean) => !!token),
            map((token: Token) => token),
        );
    }

    public clearCardElement (): void {
        this.cardElement.clear();
    }
}
