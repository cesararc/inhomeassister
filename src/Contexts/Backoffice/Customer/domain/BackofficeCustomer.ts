import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { BackofficeCustomerDisplayName } from "./BackofficeCustomerDisplayName";
import { BackofficeCustomerEmail } from "./BackofficeCustomerEmail";
import { BackofficeCustomerPhone } from "./BackofficeCustomerPhone";
import { BackofficeCustomerUid } from "./BackofficeCustomerUId";


export class BackofficeCustomer extends AggregateRoot {

    readonly id: BackofficeCustomerUid;
    readonly displayName: BackofficeCustomerDisplayName;
    readonly phone: BackofficeCustomerPhone;
    readonly email: BackofficeCustomerEmail;

    constructor(id: BackofficeCustomerUid, displayName: BackofficeCustomerDisplayName, phone: BackofficeCustomerPhone, email: BackofficeCustomerEmail) {
        super();
        this.id = id;
        this.displayName = displayName;
        this.phone = phone;
        this.email = email;
    }

    toPrimitives() {
        return {
            id: this.id.value,
            displayName: this.displayName.value,
            email: this.email.value,
            phone: this.phone.value
        }
    }

    static fromPrimitives(plainData: { uid: string; displayName: string; phoneNumber: string; email: string }) {
        return new BackofficeCustomer(
            new BackofficeCustomerUid(plainData.uid),
            new BackofficeCustomerDisplayName(plainData.displayName),
            new BackofficeCustomerPhone(plainData.phoneNumber),
            new BackofficeCustomerEmail(plainData.email)
        );
    }
}