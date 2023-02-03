import { Command } from '../../../Shared/domain/Command';

export class AdminCreateCommand extends Command {
    uid: string;
    dni: string;

    constructor({ uid, dni }: { uid: string, dni: string; }) {
        super();
        this.uid = uid;
        this.dni = dni;
    }
}