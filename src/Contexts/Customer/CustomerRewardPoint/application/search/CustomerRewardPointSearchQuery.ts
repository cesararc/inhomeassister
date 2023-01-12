import { Query } from "../../../../Shared/domain/Query";

export class CustomerRewardPointSearchQuery implements Query {
    uid: string;

    constructor(uid: string) {
        this.uid = uid;
    }
}