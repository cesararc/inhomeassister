import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { CustomerUid } from "./CustomerUid";
import { CustomerPhone } from './CustomerPhone';
import { CustomerEmail } from "./CustomerEmail";
import { CustomerPassword } from "./CustomerPassword";
import { CustomerDisplayName } from './CustomerDisplayName';
import { CustomerCreatedDomainEvent } from './CustomerCreatedDomainEvent';

export class Customer extends AggregateRoot {

    readonly id: CustomerUid;
    readonly displayName: CustomerDisplayName;
    readonly phoneNumber: CustomerPhone;
    readonly email: CustomerEmail;
    readonly password: CustomerPassword;

    constructor(id: CustomerUid, displayName: CustomerDisplayName, phone: CustomerPhone, email: CustomerEmail, password: CustomerPassword) {
        super();
        this.id = id;
        this.displayName = displayName;
        this.phoneNumber = phone;
        this.email = email;
        this.password = password;
    }

    static create(uid: CustomerUid, displayName: CustomerDisplayName, phoneNumber: CustomerPhone, email: CustomerEmail, password: CustomerPassword): Customer {

        const customer = new Customer(uid, displayName, phoneNumber, email, password);

        customer.record(new CustomerCreatedDomainEvent({
            email: email.value,
            uid: uid.value
        }));

        return customer;
    }

    toPrimitives() {
        return {
            id: this.id.value,
            displayName: this.displayName.value,
            email: this.email.value,
            phoneNumber: this.phoneNumber.value,
            password: this.password.value
        }
    }
}