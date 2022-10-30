import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { BackofficeCustomerDisplayName } from "./BackofficeCustomerDisplayName";
import { BackofficeCustomerEmail } from "./BackofficeCustomerEmail";
import { BackofficeCustomerPhone } from "./BackofficeCustomerPhone";
import { BackofficeCustomerUid } from "./BackofficeCustomerUId";


export class BackofficeCustomer extends AggregateRoot {

    readonly id: BackofficeCustomerUid;
    readonly displayname: BackofficeCustomerDisplayName;
    readonly phone: BackofficeCustomerPhone;
    readonly email: BackofficeCustomerEmail;

    constructor(id: BackofficeCustomerUid, displayname: BackofficeCustomerDisplayName, phone: BackofficeCustomerPhone, email: BackofficeCustomerEmail) {
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

    static fromPrimitives(plainData: { uid: string; displayName: string; phoneNumber: string; email: string }) {
        return new BackofficeCustomer(
            new BackofficeCustomerUid(plainData.uid),
            new BackofficeCustomerDisplayName(plainData.displayName),
            new BackofficeCustomerPhone(plainData.phoneNumber),
            new BackofficeCustomerEmail(plainData.email)
        );
    }
}