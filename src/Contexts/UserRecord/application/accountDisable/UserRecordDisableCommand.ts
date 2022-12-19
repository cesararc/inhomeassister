import { Command } from '../../../Shared/domain/Command';

export class UserRecordDisableCommand extends Command {
    readonly uid: string;

    constructor(uid: string) {
        super();
        this.uid = uid;
    }
}