import { AggregateRoot } from "../../domain/AggregateRoot";
import { auth } from '../../../../Apps/database';
import { Auth } from "firebase-admin/lib/auth/auth";

export abstract class AuthRepository<T extends AggregateRoot>{

    protected authentication(): Auth {
        return auth;
    }

    protected async persist(aggregateRoot: T) {
        await auth.createUser(aggregateRoot.toPrimitives());

        const uid = aggregateRoot.toPrimitives().uid;
        const role = aggregateRoot.toPrimitives().claim;
        await auth.setCustomUserClaims(uid, { role });
    }

}