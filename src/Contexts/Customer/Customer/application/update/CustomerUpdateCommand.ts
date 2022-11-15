import { Command } from '../../../../Shared/domain/Command';

export class CustomerUpdateCommand extends Command {
    uid: string;
    address: string;
    birthday: Date;
    dni: string;

    constructor(params: { uid: string, address: string, birthday: Date; dni: string; }) {
        super();
        this.uid = params.uid;
        this.address = params.address;
        this.birthday = params.birthday;
        this.dni = params.dni;
    }
}