import { DateValueObject } from "../../Shared/domain/value-objects/DateValueObject";

export class ContractUpdatedAt extends DateValueObject {
    static initialize(): string {
        return new Date().toISOString();
    }
}