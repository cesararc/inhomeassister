
type Params = {
    uid: string;
    displayName: string;
    phone: string;
    email: string;
    password: string;
}

export class UserRecordCreateCommand {

    uid: string;
    displayName: string;
    phone: string;
    email: string;
    password: string;

    constructor({ uid, displayName, phone, email, password }: Params) {
        this.uid = uid;
        this.displayName = displayName;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
}