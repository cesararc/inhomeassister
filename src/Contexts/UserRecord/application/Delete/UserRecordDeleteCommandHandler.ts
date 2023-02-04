import { Command } from '../../../Shared/domain/Command';
import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { UserRecordDeleteCommand } from './UserRecordDeleteCommand';
import { UserRecordUid } from '../../domain/UserRecordUid';
import { UserRecordDelete } from './UserRecordDelete';

export class UserRecordDeleteCommandHandler implements CommandHandler<UserRecordDeleteCommand>{

    constructor(private userRecordRemove: UserRecordDelete) { }

    subscribedTo(): Command {
        return UserRecordDeleteCommand;
    }

    async handle(command: UserRecordDeleteCommand) {
        const uid = new UserRecordUid(command.uid);

        await this.userRecordRemove.run(uid);
    }
}