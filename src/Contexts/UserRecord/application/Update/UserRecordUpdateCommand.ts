type Params = {
    uid: string;
    displayName: string;
    phone: string;
    email: string;
}

export class UserRecordUpdateCommand {

    uid: string;
    displayName: string;
    phone: string;
    email: string;

    constructor({ uid, displayName, phone, email }: Params) {
        this.uid = uid;
        this.displayName = displayName;
        this.phone = phone;
        this.email = email;
    }
}