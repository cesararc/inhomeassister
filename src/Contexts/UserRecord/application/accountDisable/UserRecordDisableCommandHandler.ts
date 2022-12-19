import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { UserRecordUid } from '../../domain/UserRecordUid';
import { UserRecordDisable } from './UserRecordDisable';
import { UserRecordDisableCommand } from './UserRecordDisableCommand';

export class UserRecordDisableCommandHandler implements CommandHandler<UserRecordDisableCommand>{

    constructor(private userRecord: UserRecordDisable) { }

    subscribedTo() {
        return UserRecordDisableCommand;
    }

    async handle(command: UserRecordDisableCommand) {
        await this.userRecord.run(new UserRecordUid(command.uid));
    }

}