export class UserRecordResetPasswordCommand {

    email: string;

    constructor({ email }: { email: string }) {
        this.email = email;
    }
}