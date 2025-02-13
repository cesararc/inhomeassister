import { Command } from "../../../Shared/domain/Command";

type Params = {
    uid: string;
    displayName: string;
    phoneNumber: string;
    email: string;
    claim: string;
    password: string;
    address: string;
    birthday: string;
    dni: string;
}

export class CustomerCreateCommand extends Command {
    uid: string;
    displayName: string;
    phoneNumber: string;
    email: string;
    password: string;
    claim: string;
    address: string;
    birthday: string;
    dni: string;

    constructor({ uid, displayName, phoneNumber, email, password, claim, address, birthday, dni }: Params) {
        super();
        this.uid = uid;
        this.displayName = displayName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.claim = claim;
        this.address = address;
        this.birthday = birthday;
        this.dni = dni;
    }
}