import { Command } from "../../../../Shared/domain/Command";

export class SellerCreateCommand extends Command {
    id: string;
    phone: string;
    displayname: string;
    email: string;
    password: string;

    constructor({ id, email, password, displayName, phone }: { id: string, phone: string, displayName: string, email: string, password: string }) {
        super();
        this.id = id;
        this.phone = phone
        this.email = email;
        this.password = password;
        this.displayname = displayName;
    }
}