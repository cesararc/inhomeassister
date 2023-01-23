import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { UserRecordCreate } from './UserRecordCreate';
import { UserRecordUid } from '../../domain/UserRecordUid';
import { UserRecordDisplayName } from '../../domain/UserRecordDisplayName';
import { UserRecordPhone } from '../../domain/UserRecordPhone';
import { UserRecordEmail } from '../../domain/UserRecordEmail';
import { UserRecordPassword } from '../../domain/UserRecordPassword';
import { UserRecordCreateCommand } from './UserRecordCreateCommand';
import { UserRecordClaim } from '../../domain/UserRecordClaim';

export class UserRecordCreateCommandHandler implements CommandHandler<UserRecordCreateCommand>{
    constructor(private userRecorCreate: UserRecordCreate) { }

    subscribedTo() {
        return UserRecordCreateCommand;
    }

    async handle(command: UserRecordCreateCommand) {
        await this.userRecorCreate.run(
            new UserRecordUid(command.uid),
            new UserRecordDisplayName(command.displayName),
            new UserRecordPhone(command.phone),
            new UserRecordEmail(command.email),
            new UserRecordPassword(command.password),
            new UserRecordClaim(command.claim)
        );
    }
}