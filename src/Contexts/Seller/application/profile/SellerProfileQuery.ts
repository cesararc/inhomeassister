import { Query } from '../../../Shared/domain/Query';

export class SellerProfileQuery implements Query {
    uid: string;

    constructor(uid: string) {
        this.uid = uid;
    }
}