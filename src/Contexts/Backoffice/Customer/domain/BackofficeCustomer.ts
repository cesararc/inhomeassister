import { CustomerDisplayName } from "../../../../Customer/Customer/domain/CustomerDisplayName";
import { CustomerEmail } from "../../../../Customer/Customer/domain/CustomerEmail";
import { CustomerPhone } from "../../../../Customer/Customer/domain/CustomerPhone";
import { BackofficeCustomer } from "../../../../Customer/Customer/domain/BackofficeCustomer";
import { AggregateRoot } from "../../../../Shared/domain/AggregateRoot";

export class BackofficeCustomer extends AggregateRoot {

    readonly id: BackofficeCustomer;
    readonly displayname: CustomerDisplayName;
    readonly phone: CustomerPhone;
    readonly email: CustomerEmail;

    constructor(id: BackofficeCustomer, displayname: CustomerDisplayName, phone: CustomerPhone, email: CustomerEmail) {
        super();
        this.id = id;
        this.displayname = displayname;
        this.phone = phone;
        this.email = email;
    }

    toPrimitives() {
        return {
            id: this.id.value,
            displayname: this.displayname.value,
            email: this.email.value,
            phone: this.phone.value
        }
    }

    static fromPrimitives(plainData: { uid: string; displayName: string; phoneNumber: string; email: string }): Customer {
        return new BackofficeCustomer(
            new BackofficeCustomer(plainData.uid),
            new CustomerDisplayName(plainData.displayName),
            new CustomerPhone(plainData.phoneNumber),
            new CustomerEmail(plainData.email)
        );
    }
}