import { Query } from '../../../Shared/domain/Query';

export class AdminProfileQuery implements Query {
    uid: string;

    constructor(uid: string) {
        this.uid = uid;
    }
}