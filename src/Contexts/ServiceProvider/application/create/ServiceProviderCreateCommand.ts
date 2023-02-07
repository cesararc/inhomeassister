import { Command } from "../../../Shared/domain/Command";

type Params = {
    uid: string;
    displayName: string;
    phoneNumber: string;
    email: string;
    claim: string;
    password: string;
    address: string,
    description: string;
    dni: string
}

export class ServiceProviderCreateCommand extends Command {
    uid: string;
    displayName: string;
    phoneNumber: string;
    email: string;
    password: string;
    claim: string;
    address: string;
    description: string;
    dni: string;

    constructor({ uid, displayName, phoneNumber, email, password, claim, address, dni, description }: Params) {
        super();
        this.uid = uid;
        this.displayName = displayName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.claim = claim;
        this.address = address;
        this.dni = dni;
        this.description = description;
    }
}