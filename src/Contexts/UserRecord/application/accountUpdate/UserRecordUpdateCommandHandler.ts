import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { UserRecordUid } from '../../domain/UserRecordUid';
import { UserRecordDisplayName } from '../../domain/UserRecordDisplayName';
import { UserRecordPhone } from '../../domain/UserRecordPhone';
import { UserRecordEmail } from '../../domain/UserRecordEmail';
import { UserRecordUpdate } from './UserRecordUpdate';
import { UserRecordUpdateCommand } from './UserRecordUpdateCommand';

export class UserRecordUpdateCommandHandler implements CommandHandler<UserRecordUpdateCommand>{
    constructor(private userRecordUpdate: UserRecordUpdate) { }

    subscribedTo() {
        return UserRecordUpdateCommand;
    }

    async handle(command: UserRecordUpdateCommand) {
        await this.userRecordUpdate.run(
            new UserRecordUid(command.uid),
            new UserRecordDisplayName(command.displayName),
            new UserRecordPhone(command.phone),
            new UserRecordEmail(command.email),
        );
    }
}