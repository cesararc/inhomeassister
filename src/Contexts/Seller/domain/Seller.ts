import { AggregateRoot } from "../../Shared/domain/AggregateRoot";
import { SellerUid } from './SellerUid';
import { SellerAddress } from './SellerAddress';
import { SellerDni } from './SellerDni';
import { SellerCreatedDomainEvent } from './SellerCreatedDomainEvent';

export class Seller extends AggregateRoot {

    readonly uid: SellerUid;
    readonly address: SellerAddress;
    readonly dni: SellerDni;

    constructor(uid: SellerUid, address: SellerAddress, dni: SellerDni) {
        super();
        this.uid = uid;
        this.address = address;
        this.dni = dni;
    }

    static create(uid: SellerUid, address: SellerAddress, dni: SellerDni) {

        const seller = new Seller(uid, address, dni);

        seller.record(new SellerCreatedDomainEvent({ uid: uid.value }));

        return seller;
    }

    static fromPrimitives(plainData: { uid: string; address: string; dni: string; }) {
        return new Seller(
            new SellerUid(plainData.uid),
            new SellerAddress(plainData.address),
            new SellerDni(plainData.dni),
        );
    }

    toPrimitives() {
        return {
            uid: this.uid.value,
            address: this.address.value,
            dni: this.dni.value,
        }
    }
}