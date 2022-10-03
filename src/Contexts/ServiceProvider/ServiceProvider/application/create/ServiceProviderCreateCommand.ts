import { Command } from "../../../../Shared/domain/Command";

export class ServiceProviderCreateCommand extends Command {
    id: string;
    disabled: boolean;
    phone: string;
    displayname: string;
    email: string;
    password: string;

    constructor({ id, disabled, email, password, displayName, phone }: { id: string, disabled: boolean, phone: string, displayName: string, email: string, password: string }) {
        super();
        this.id = id;
        this.disabled = disabled;
        this.phone = phone
        this.email = email;
        this.password = password;
        this.displayname = displayName;
    }
}