import { UserRecord } from "../../domain/UserRecord";

export class UserRecordProfileResponse {
    userRecord: UserRecord;

    constructor(userRecord: UserRecord) {
        this.userRecord = userRecord;
    }
}