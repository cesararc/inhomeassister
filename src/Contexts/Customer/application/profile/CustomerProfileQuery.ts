import { Query } from "../../../Shared/domain/Query";

export class CustomerProfileQuery implements Query {
    customerUid: string;

    constructor(customerUid: string) {
        this.customerUid = customerUid;
    }
}