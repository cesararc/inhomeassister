import { Claim } from '../../domain/UserRecordClaim';

type Params = {
    uid: string;
    displayName: string;
    phone: string;
    email: string;
    password: string;
    claim: Claim;
}

export class UserRecordCreateCommand {

    uid: string;
    displayName: string;
    phone: string;
    email: string;
    password: string;
    claim: Claim;

    constructor({ uid, displayName, phone, email, password, claim }: Params) {
        this.uid = uid;
        this.displayName = displayName;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.claim = claim;
    }
}