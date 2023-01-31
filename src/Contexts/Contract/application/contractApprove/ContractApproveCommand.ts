import { Command } from '../../../Shared/domain/Command';

export class ContractApproveCommand extends Command {
    uid: string;

    constructor(uid: string) {
        super();
        this.uid = uid;
    }
}