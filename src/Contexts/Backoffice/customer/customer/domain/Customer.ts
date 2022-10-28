import { CustomerDisplayName } from "../../../../Customer/Customer/domain/CustomerDisplayName";
import { CustomerEmail } from "../../../../Customer/Customer/domain/CustomerEmail";
import { CustomerPhone } from "../../../../Customer/Customer/domain/CustomerPhone";
import { CustomerUid } from "../../../../Customer/Customer/domain/CustomerUid";
import { AggregateRoot } from "../../../../Shared/domain/AggregateRoot";

export class Customer extends AggregateRoot {

    readonly id: CustomerUid;
    readonly displayname: CustomerDisplayName;
    readonly phone: CustomerPhone;
    readonly email: CustomerEmail;

    constructor(id: CustomerUid, displayname: CustomerDisplayName, phone: CustomerPhone, email: CustomerEmail) {
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
        return new Customer(
            new CustomerUid(plainData.uid),
            new CustomerDisplayName(plainData.displayName),
            new CustomerPhone(plainData.phoneNumber),
            new CustomerEmail(plainData.email)
        );
    }
}