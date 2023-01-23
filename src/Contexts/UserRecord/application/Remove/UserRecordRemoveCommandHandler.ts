import { Command } from '../../../Shared/domain/Command';
import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { UserRecordRemoveCommand } from './UserRecordRemoveCommand';
import { UserRecordRemove } from './UserRecordRemove';
import { UserRecordUid } from '../../domain/UserRecordUid';

export class UserRecordRemoveCommandHandler implements CommandHandler<UserRecordRemoveCommand>{

    constructor(private userRecordRemove: UserRecordRemove) { }

    subscribedTo(): Command {
        return UserRecordRemoveCommand;
    }

    async handle(command: UserRecordRemoveCommand) {
        const uid = new UserRecordUid(command.uid);

        await this.userRecordRemove.run(uid);
    }
}