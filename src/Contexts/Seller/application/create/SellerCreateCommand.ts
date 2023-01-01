import { Command } from '../../../Shared/domain/Command';

export class SellerCreateCommand extends Command {
    uid: string;
    address: string;
    description: string;
    dni: string;

    constructor({ uid, address, dni }: { uid: string; address: string; dni: string }) {
        super();
        this.uid = uid;
        this.address = address;
        this.dni = dni;
    }
}