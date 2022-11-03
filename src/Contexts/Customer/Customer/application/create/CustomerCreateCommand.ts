import { Command } from "../../../../Shared/domain/Command";

export class CustomerCreateCommand extends Command {
    userRecordUid: string;
    uid: string;
    address: string;
    birthday: Date;

    constructor({ userRecordUid, uid, address, birthday }: { userRecordUid: string; uid: string, address: string, birthday: Date; }) {
        super();
        this.uid = uid;
        this.userRecordUid = userRecordUid
        this.address = address;
        this.birthday = birthday;
    }
}