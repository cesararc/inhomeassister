import { Command } from "../../../../Shared/domain/Command";

export class CustomerCreateCommand extends Command {
    id: string;
    phoneNumber: string;
    displayName: string;
    email: string;
    password: string;

    constructor({ id, email, password, displayName, phoneNumber }: { id: string, phoneNumber: string, displayName: string, email: string, password: string }) {
        super();
        this.id = id;
        this.phoneNumber = phoneNumber
        this.email = email;
        this.password = password;
        this.displayName = displayName;
    }
}