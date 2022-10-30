import { AggregateRoot } from "../../domain/AggregateRoot";
import { auth } from '../../../../Apps/database';

export abstract class AuthRepository<T extends AggregateRoot>{
    protected async persist(aggregateRoot: T) {
        await auth.createUser(aggregateRoot.toPrimitives());
    }
}
