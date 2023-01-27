import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { CartService } from '../../services/cart.service';
import { FormService } from '../../services/form.service';
import { CheckoutFormValidator } from '../../validators/checkout-form-validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0.0;
  totalQuantity: number = 0;

  months: number[] = [];
  years: number[] = [];
  countries: Country[] = [];
  states: State[] = [];
  shippingAddresStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            CheckoutFormValidator.notOnlyWhiteSpace,
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            CheckoutFormValidator.notOnlyWhiteSpace,
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
      }),
      shippingAddress: this.formBuilder.group({
        street: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            CheckoutFormValidator.notOnlyWhiteSpace,
          ],
        ],
        city: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            CheckoutFormValidator.notOnlyWhiteSpace,
          ],
        ],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            CheckoutFormValidator.notOnlyWhiteSpace,
          ],
        ],
      }),
      billingAddress: this.formBuilder.group({
        street: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            CheckoutFormValidator.notOnlyWhiteSpace,
          ],
        ],
        city: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            CheckoutFormValidator.notOnlyWhiteSpace,
          ],
        ],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            CheckoutFormValidator.notOnlyWhiteSpace,
          ],
        ],
      }),
      creditCard: this.formBuilder.group({
        cardType: ['', [Validators.required]],
        nameOnCard: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            CheckoutFormValidator.notOnlyWhiteSpace,
          ],
        ],
        cardNumber: [
          '',
          [Validators.required, Validators.pattern('[0-9]{16}')],
        ],
        securityCode: [
          '',
          [Validators.required, Validators.pattern('[0-9]{3}')],
        ],
        expirationMonth: ['', [Validators.required]],
        expirationYear: ['', [Validators.required]],
      }),
    });

    // populate credit card months
    const startMonth = new Date().getMonth() + 1;
    this.formService
      .getCreditCardMonts(startMonth)
      .subscribe((months) => (this.months = months));

    // populate credit card years
    this.formService
      .getCreditCardYears()
      .subscribe((years) => (this.years = years));

    // populate countries
    this.formService
      .getCountries()
      .subscribe((countries) => (this.countries = countries));
  }

  reviewCartDetails() {
    // subscribe to cart status
    this.cartService.cartStatus.subscribe((cartStatus) => {
      this.totalPrice = cartStatus.totalPrice;
      this.totalQuantity = cartStatus.totalQuantity;
    });
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  get cardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get nameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }
  get cardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get securityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }

  onSubmit() {
    console.log(this.checkoutFormGroup.get('customer')?.value);
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.value) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      this.billingAddressStates = this.shippingAddresStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = +creditCardFormGroup?.value.expirationYear;

    let startMonth: number;

    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.formService
      .getCreditCardMonts(startMonth)
      .subscribe((data) => (this.months = data));
  }

  getStates(formGroupName: string) {
    let formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;

    this.formService.getStates(countryCode).subscribe((states) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddresStates = states;
      } else {
        this.billingAddressStates = states;
      }
      // select first value by default
      formGroup?.get('state')?.setValue(states[0]);
    });
  }
}
