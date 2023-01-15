import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { UserRecordEmail } from '../../domain/UserRecordEmail';
import { UserRecordResetPasswordCommand } from './UserRecordResetPasswordCommand';
import { UserRecordResetPassword } from './UserRecordResetPassword';

export class UserRecordResetPasswordCommandHandler implements CommandHandler<UserRecordResetPasswordCommand>{
    constructor(private userRecordResetPassword: UserRecordResetPassword) { }

    subscribedTo() {
        return UserRecordResetPasswordCommand;
    }

    async handle(command: UserRecordResetPasswordCommand) {
        await this.userRecordResetPassword.run(
            new UserRecordEmail(command.email)
        );
    }
}