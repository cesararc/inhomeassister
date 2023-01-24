import { Query } from "../../../Shared/domain/Query";

export class ContractUnverifiedQuery implements Query {
    uid: string;

    constructor(uid: string) {
        this.uid = uid;
    }
}