import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Token } from "ngx-stripe";
import { ToastrService } from "ngx-toastr";
import { SubscriptionService } from "../../services/subscription.service";
import { SubscriptionPlansModel } from "../../models/subscription-plans.model";
import { StripeCardComponent } from "../../components/stripe-card/stripe-card.component";
import { CommonComponent } from "../../classes/common-component";
import { SubscriptionsContract } from "../../contracts/subscriptions.contract";
import { FormsContract } from "../../contracts/forms.contract";
import { SUBSCRIPTION_CONTROLS_CONFIG } from "./form-config";
import { PaymentSubscriptionDto } from "../../types/payment-subscription.dto";
import { CurrentSubscriptionModel } from "../../models/current-subscription.model";
import { PaymentSubscriptionStatus } from "../../app.constants";

@Component({
    selector: 'subscription-page',
    templateUrl: './subscription-page.component.html',
    styleUrls: ['./subscription-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionPageComponent extends CommonComponent implements OnInit {
    public readonly FormsContract: typeof FormsContract = FormsContract;
    public subscriptionForm: FormGroup;
    public paymentSubscriptionStatus: typeof PaymentSubscriptionStatus = PaymentSubscriptionStatus;
    public subscriptionPlans: BehaviorSubject<SubscriptionPlansModel[]> = new BehaviorSubject<SubscriptionPlansModel[]>([]);
    public cardErrorMessage: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public hasError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isInProcessing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public currentSubscriptionText: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public currentSubscription: BehaviorSubject<CurrentSubscriptionModel | null> =
        new BehaviorSubject<CurrentSubscriptionModel | null>(null);

    @ViewChild('stripeCard')
    private stripeCard: StripeCardComponent;

    constructor (
        private readonly formBuilder: FormBuilder,
        private readonly subscriptionService: SubscriptionService,
        private readonly toastr: ToastrService,
    ) {
        super();
        this.subscriptionForm = this.formBuilder.group(SUBSCRIPTION_CONTROLS_CONFIG);
    }

    private setCurrentSubscription (currentSubscription: CurrentSubscriptionModel): void {
        this.subscriptionForm.disable();
        this.currentSubscription.next(currentSubscription);
        this.currentSubscriptionText.next(
            `${currentSubscription.name}: ${currentSubscription.price} ${currentSubscription.currency} (per ${currentSubscription.interval})`,
        );
    }

    private setError (err: ErrorEvent): void  {
        const errMessage: string = err.error.message || err.message;

        this.toastr.error(errMessage);
        this.cardErrorMessage.next(errMessage);
        this.hasError.next(true);
        this.isInProcessing.next(false);
    }

    public cardError (event: boolean): void {
        this.hasError.next(event);
    }

    public ngOnInit (): void {
        this.updateSubscription(
            SubscriptionsContract.Stripe.SUBSCRIPTION_PLANS,
            this.subscriptionService.getCurrentSubscriptions().pipe(
                switchMap((currentSubscription: CurrentSubscriptionModel | null) => {
                    if (currentSubscription) this.setCurrentSubscription(currentSubscription);

                    return this.subscriptionService.getSubscriptionPlans();
                }),
            ).subscribe(
                (plans: SubscriptionPlansModel[]) => {
                    this.subscriptionPlans.next(plans);
                    this.currentSubscription.value
                        ? this.subscriptionForm.controls[FormsContract.Subscription.PLAN].setValue(this.currentSubscription.value.id)
                        : this.subscriptionForm.controls[FormsContract.Subscription.PLAN].setValue(plans[0].id);
                },
                (err) => {
                    const errMessage: string = err.error.message || err.message;
                    this.toastr.error(errMessage);
                },
            ),
        );
    }

    public submitSubscription (): void {
        if (this.subscriptionForm.invalid) return;

        this.cardErrorMessage.next(null);
        this.isInProcessing.next(true);

        this.updateSubscription(
            SubscriptionsContract.Stripe.CREATE_SUBSCRIPTION,
            this.stripeCard.getPaymentToken().pipe(
                switchMap((token: Token) => {
                    const dto: PaymentSubscriptionDto = {
                        paymentToken: token.id,
                        subscriptionPlanId: this.subscriptionForm.value[FormsContract.Subscription.PLAN],
                    };

                    return this.subscriptionService.createSubscription(dto);
                }),
            ).subscribe(
                (subscription: CurrentSubscriptionModel) => {
                    this.toastr.success('The subscription has been done successfully');
                    this.setCurrentSubscription(subscription);
                    this.stripeCard.clearCardElement();
                },
                (err: ErrorEvent) => {
                    this.setError(err);
                },
                () => {
                    this.isInProcessing.next(false);
                },
            ),
        );
    }

    public cancelSubscription (): void {
        this.updateSubscription(
            SubscriptionsContract.Stripe.CANCEL_SUBSCRIPTION,
            this.subscriptionService.cancelSubscription(this.currentSubscription.value.subscriptionID).subscribe(
                () => {
                    this.toastr.success('Your subscription has been canceled successfully');
                    this.subscriptionForm.enable();
                    this.currentSubscription.next(null);
                },
                (err: ErrorEvent) => {
                    this.setError(err);
                },
            ),
        );
    }
}
