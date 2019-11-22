import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { $ } from 'protractor';
import { Observable } from 'rxjs';

declare var SecureFields;

interface SecureFields {
    event: {
        field: string;
        type: string;
    }
    fields: {
        cardNumber: {
            length: number;
            paymentMethod: string;
            required: boolean;
            valid: boolean;
        }
        cvv: {
            length: number;
            required: boolean;
            valid: boolean;
        }
    }
    hasErrors: boolean;
}

interface SecureFieldsResult {
    cardInfo: {
        brand: string;
        country: string;
        issuer: string;
        type: string;
        usage: string;
    }
    result: string;
    transactionId: number;
}

export interface CreditCardComponent {
    componentName: string | null;
    creditCardType: string | null;
    creditCardNr: string | null;
    transactionId: number;
    creditCardOwner: string | null;
    validUntil: string | null; // mm/yy
}

@Component({
    selector: 'app-pci',
    templateUrl: './pci.component.html',
    styleUrls: ['./pci.component.scss']
})
export class PciComponent implements OnInit {

    formPci: FormGroup;
    pciUrl = 'https://pay.sandbox.datatrans.com/upp/payment/js/secure-fields-1.0.0.js';
    secureFields;

    toggleCC: boolean = true;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.formPci = this.fb.group({
            componentName: '',
            creditCardNr: '',
            transactionId: ['', { disabled: true }],
            creditCardOwner: '',
            validUntilMonth: '',
            validUntilYear: ''
        });

        this.createNode();

    }

    toggleCreditCard() {
        this.toggleCC = !this.toggleCC;
    }

    createNode() {
        if (document.querySelector('script[src="' + this.pciUrl + '"]')) {
            this.setSecureFields();
            return
        }

        let node = document.createElement('script');
        node.src = this.pciUrl;
        node.onload = () => {
            this.setSecureFields();
        }
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    setSecureFields() {
        this.secureFields = new SecureFields();

        this.secureFields.initTokenize(
            '1100017069',
            {
                cardNumber: {
                    placeholderElementId: 'card-number',
                    inputType: 'tel'
                },
                cvv: {
                    placeholderElementId: 'cvv-number',
                    inputType: 'tel'
                }
            },
            {
                // options...
            }
        );

        var cardContainer = document.getElementById('card-number-container');
        var cvvContainer = document.getElementById('cvv-container');

        // Set class names when fields change
        this.secureFields.on('change', function (data: SecureFields) {
            console.log(data)
            var self = this;
            var cardImage: HTMLImageElement = cardContainer.querySelector('.secure-field--card-icon__recognized-card');
            cardContainer.classList.remove('secure-field__has-error');
            cvvContainer.classList.remove('secure-field__has-error');

            if (!data.fields.cardNumber.paymentMethod) {
                cardImage.src = 'assets/img/card-empty.svg';
                cardContainer.classList.remove('secure-field__is-recognized');
            } else {
                cardImage.src = 'assets/img/brands/' + data.fields.cardNumber.paymentMethod + '.svg';
                cardContainer.classList.add('secure-field__is-recognized');
            }

            // check for transactionId
            if (data.event.type === 'keyUp' && !data.hasErrors) {
                console.log(data);
                self.getTransactionId();
            } else if (data.hasErrors) {
                this.formPci.get('transactionId').setValue('');
            }
        }.bind(this), false);

        // Set class names on validate
        this.secureFields.on('validate', function (data: SecureFields) {
            console.log(data)
            if (data.fields.cardNumber.valid) {
                cardContainer.classList.remove('secure-field__has-error');
            } else {
                cardContainer.classList.remove('secure-field__is-recognized');
                cardContainer.classList.add('secure-field__has-error');
            }

            if (data.fields.cvv.valid) {
                cvvContainer.classList.remove('secure-field__has-error');
            } else {
                cvvContainer.classList.add('secure-field__has-error');
            }
        });

    }

    // check for transactionId
    getTransactionId() {
        this.secureFields.submit();
        var self = this;

        this.secureFields.on('success', function (data: SecureFieldsResult) {
            console.log(data)
            if (data.transactionId) {
                let self = this;

                this.formPci.get('transactionId').setValue(data.transactionId);

                this.getTokenizedCreditCard(data.transactionId).subscribe(r => {
                    let res = r;

                    var result = document.getElementById('form-result');
                    result.innerText = 'transactionId: ' + data.transactionId + '<br>cc: ' + res.aliasCC + '<br>cvv: ' + res.aliasCVV;
                    result.style.display = 'block';

                })

            }
        }.bind(this), false);
    }

    getTokenizedCreditCard(transactionId: number): Observable<any> {
        const config = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Basic " + btoa("1100017069:CAuhqXV6jfuQaY5P")
            })
        }

        return this.http.get<any>('/apisandbox/upp/services/v1/inline/token?transactionId=' + transactionId, config)
    }

    submit() {
        console.log(this.formPci.value);
    }


}
