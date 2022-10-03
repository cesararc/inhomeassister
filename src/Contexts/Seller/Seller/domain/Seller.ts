import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { SellerUid } from "./SellerUid";
import { SellerPhone } from './SellerPhone';
import { SellerEmail } from "./SellerEmail";
import { SellerPassword } from "./SellerPassword";
import { SellerDisplayName } from './SellerDisplayName';

export class Seller extends AggregateRoot {

    readonly id: SellerUid;
    readonly displayname: SellerDisplayName;
    readonly phone: SellerPhone;
    readonly email: SellerEmail;
    readonly password: SellerPassword;

    constructor(id: SellerUid, displayname: SellerDisplayName, phone: SellerPhone, email: SellerEmail, password: SellerPassword) {
        super();
        this.id = id;
        this.displayname = displayname;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }

    static create(id: SellerUid, displayname: SellerDisplayName, phone: SellerPhone, email: SellerEmail, password: SellerPassword): Seller {

        const seller = new Seller(id, displayname, phone, email, password);

        return seller;
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