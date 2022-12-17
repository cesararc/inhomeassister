import { Command } from "../../../../Shared/domain/Command";

export class ServiceProviderUpdateCommand extends Command {
    uid: string;
    address: string;
    description: string;
    dni: string;

    constructor({ uid, address, dni, description }: { uid: string; address: string, description: string; dni: string }) {
        super();
        this.uid = uid;
        this.address = address;
        this.dni = dni;
        this.description = description;
    }
}