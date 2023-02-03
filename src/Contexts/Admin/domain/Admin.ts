
import { AdminUid } from './AdminUid';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { AdminDNI } from './AdminDNI';

export class Admin extends AggregateRoot {

    readonly uid: AdminUid;
    readonly dni: AdminDNI;

    constructor(uid: AdminUid, dni: AdminDNI) {
        super();
        this.uid = uid;
        this.dni = dni;
    }

    static create(uid: AdminUid, dni: AdminDNI): Admin {

        return new Admin(uid, dni);
    }

    toPrimitives() {
        return {
            uid: this.uid.value,
            dni: this.dni.value
        }
    }

    static fromPrimitives(plainData: { uid: string; dni: string }) {
        return new Admin(
            new AdminUid(plainData.uid),
            new AdminDNI(plainData.dni)
        );
    }
}