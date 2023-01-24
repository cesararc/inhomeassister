import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { UserRecordUid } from '../../domain/UserRecordUid';
import { UserRecordEnable } from './UserRecordEnable';
import { UserRecordEnableCommand } from './UserRecordEnableCommand';

export class UserRecordEnableCommandHandler implements CommandHandler<UserRecordEnableCommand>{

    constructor(private userRecord: UserRecordEnable) { }

    subscribedTo() {
        return UserRecordEnableCommand;
    }

    async handle(command: UserRecordEnableCommand) {
        await this.userRecord.run(new UserRecordUid(command.uid));
    }

}