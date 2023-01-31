import { Command } from '../../../Shared/domain/Command';

export class ContractRejectCommand extends Command {
    uid: string;

    constructor(uid: string) {
        super();
        this.uid = uid;
    }
}