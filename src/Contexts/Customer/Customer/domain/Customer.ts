import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { CustomerUid } from "./CustomerUid";
import { CustomerCreatedDomainEvent } from './CustomerCreatedDomainEvent';
import { CustomerBirthday } from "./CustomerBirthday";
import { CustomerAddress } from './CustomerAddress';

export class Customer extends AggregateRoot {

    readonly uid: CustomerUid;
    readonly birthday: CustomerBirthday;
    readonly address: CustomerAddress;

    constructor(uid: CustomerUid, birthday: CustomerBirthday, address: CustomerAddress) {
        super();
        this.uid = uid;
        this.birthday = birthday;
        this.address = address;
    }

    static create(uid: CustomerUid, birthday: CustomerBirthday, address: CustomerAddress): Customer {

        const customer = new Customer(uid, birthday, address);

        customer.record(new CustomerCreatedDomainEvent({ uid: uid.value }));

        return customer;
    }

    toPrimitives() {
        return {
            uid: this.uid.value,
            birthday: this.birthday.value,
            address: this.address.value,
        }
    }

    static fromPrimitives(plainData: { uid: string; birthday: Date; address: string; }) {
        return new Customer(
            new CustomerUid(plainData.uid),
            new CustomerBirthday(plainData.birthday),
            new CustomerAddress(plainData.address)
        );
    }
}