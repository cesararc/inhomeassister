import { Query } from "../../../Shared/domain/Query";

export class UserRecordProfileQuery implements Query {
    userRecordUid: string;

    constructor(userRecordUid: string) {
        this.userRecordUid = userRecordUid;
    }
}