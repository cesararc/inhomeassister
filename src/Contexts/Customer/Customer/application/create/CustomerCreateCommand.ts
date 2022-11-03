import { Command } from "../../../../Shared/domain/Command";

export class CustomerCreateCommand extends Command {
    uid: string;
    address: string;
    birthday: Date;

    constructor({ uid, address, birthday }: { uid: string, address: string, birthday: Date; }) {
        super();
        this.uid = uid;
        this.address = address;
        this.birthday = birthday;
    }
}