import { AggregateRoot } from "../../domain/AggregateRoot";
import { auth } from '../../../../Apps/database';
import { Auth } from "firebase-admin/lib/auth/auth";

export abstract class AuthRepository<T extends AggregateRoot>{

    protected authentication(): Auth {
        return auth;
    }

    protected async persist(aggregateRoot: T) {
        await auth.createUser(aggregateRoot.toPrimitives());
    }

}