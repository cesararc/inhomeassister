import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { CustomerUid } from "./CustomerUid";
import { CustomerCreatedDomainEvent } from './CustomerCreatedDomainEvent';
import { CustomerBirthday } from "./CustomerBirthday";
import { CustomerAddress } from './CustomerAddress';
import { CustomerDni } from './CustomerDni';

export class Customer extends AggregateRoot {

    readonly uid: CustomerUid;
    readonly birthday: CustomerBirthday;
    readonly address: CustomerAddress;
    readonly dni: CustomerDni;

    constructor(uid: CustomerUid, birthday: CustomerBirthday, address: CustomerAddress, dni: CustomerDni) {
        super();
        this.uid = uid;
        this.birthday = birthday;
        this.address = address;
        this.dni = dni;
    }

    static create(uid: CustomerUid, birthday: CustomerBirthday, address: CustomerAddress, dni: CustomerDni): Customer {

        const customer = new Customer(uid, birthday, address, dni);

        customer.record(new CustomerCreatedDomainEvent({ uid: uid.value }));

        return customer;
    }

    static update(uid: CustomerUid, birthday: CustomerBirthday, address: CustomerAddress, dni: CustomerDni): Customer {
        const customer = new Customer(uid, birthday, address, dni);

        return customer;
    }

    toPrimitives() {
        return {
            uid: this.uid.value,
            birthday: this.birthday.value,
            address: this.address.value,
            dni: this.dni.value
        }
    }

    static fromPrimitives(plainData: { uid: string; birthday: string; address: string; dni: string }) {
        return new Customer(
            new CustomerUid(plainData.uid),
            new CustomerBirthday(plainData.birthday),
            new CustomerAddress(plainData.address),
            new CustomerDni(plainData.dni)
        );
    }
}