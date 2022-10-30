import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { CustomerUid } from "./CustomerUid";
import { CustomerPhone } from './CustomerPhone';
import { CustomerEmail } from "./CustomerEmail";
import { CustomerPassword } from "./CustomerPassword";
import { CustomerDisplayName } from './CustomerDisplayName';
import { CustomerCreatedDomainEvent } from './CustomerCreatedDomainEvent';

export class Customer extends AggregateRoot {

    readonly id: CustomerUid;
    readonly displayname: CustomerDisplayName;
    readonly phone: CustomerPhone;
    readonly email: CustomerEmail;
    readonly password: CustomerPassword;

    constructor(id: CustomerUid, displayname: CustomerDisplayName, phone: CustomerPhone, email: CustomerEmail, password: CustomerPassword) {
        super();
        this.id = id;
        this.displayname = displayname;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }

    static create(uid: CustomerUid, displayname: CustomerDisplayName, phone: CustomerPhone, email: CustomerEmail, password: CustomerPassword): Customer {

        const customer = new Customer(uid, displayname, phone, email, password);

        customer.record(new CustomerCreatedDomainEvent({
            email: email.value,
            uid: uid.value
        }));

        return customer;
    }

    toPrimitives() {
        return {
            id: this.id.value,
            displayname: this.displayname.value,
            email: this.email.value,
            phone: this.phone.value,
            password: this.password.value
        }
    }
}