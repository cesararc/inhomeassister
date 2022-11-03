import { AggregateRoot } from "../../../Shared/domain/AggregateRoot";
import { CustomerUid } from "./CustomerUid";
import { CustomerCreatedDomainEvent } from './CustomerCreatedDomainEvent';
import { CustomerBirthday } from "./CustomerBirthday";
import { CustomerAddress } from './CustomerAddress';
import { UserRecordUid } from '../../../UserRecord/domain/UserRecordUid';

export class Customer extends AggregateRoot {

    readonly userRecordUid: UserRecordUid;
    readonly uid: CustomerUid;
    readonly birthday: CustomerBirthday;
    readonly address: CustomerAddress;

    constructor(userRecordUid: UserRecordUid, uid: CustomerUid, birthday: CustomerBirthday, address: CustomerAddress) {
        super();
        this.userRecordUid = userRecordUid;
        this.uid = uid;
        this.birthday = birthday;
        this.address = address;
    }

    static create(userRecordUid: UserRecordUid, uid: CustomerUid, birthday: CustomerBirthday, address: CustomerAddress): Customer {

        const customer = new Customer(userRecordUid, uid, birthday, address);

        customer.record(new CustomerCreatedDomainEvent({ uid: uid.value }));

        return customer;
    }

    toPrimitives() {
        return {
            user_record: this.userRecordUid.value,
            uid: this.uid.value,
            birthday: this.birthday.value,
            address: this.address.value,
        }
    }

    static fromPrimitives(plainData: { userRecordUid: string, uid: string; birthday: Date; address: string; }) {
        return new Customer(
            new UserRecordUid(plainData.userRecordUid),
            new CustomerUid(plainData.uid),
            new CustomerBirthday(plainData.birthday),
            new CustomerAddress(plainData.address)
        );
    }
}