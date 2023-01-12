import { Command } from '../../../Shared/domain/Command';

export class UserRecordEnableCommand extends Command {
    readonly uid: string;

    constructor(uid: string) {
        super();
        this.uid = uid;
    }
}