import { Query } from "../../../../Shared/domain/Query";

export class ServiceProviderProfileQuery implements Query {
    uid: string;

    constructor(uid: string) {
        this.uid = uid;
    }
}